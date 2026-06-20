const mongoose = require("mongoose");
const Video = require("../models/Video");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");


const uploadVideo = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (
      !title ||
      !category ||
      !req.files?.video ||
      !req.files?.thumbnail
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail[0];

    // Validate file types
    if (!videoFile.mimetype.startsWith("video/")) {
      return res.status(400).json({
        message: "Invalid video file",
      });
    }

    if (!thumbnailFile.mimetype.startsWith("image/")) {
      return res.status(400).json({
        message: "Invalid thumbnail file",
      });
    }

    // Upload video
    const videoUpload = await uploadToCloudinary(
      videoFile.buffer,
      "videos",
      "video"
    );

    // Upload thumbnail
    const thumbnailUpload = await uploadToCloudinary(
      thumbnailFile.buffer,
      "thumbnails",
      "image"
    );

    // Save metadata
    const video = await Video.create({
      title,
      description,
      category,

      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,

      // Useful later for deleting from Cloudinary
      videoPublicId: videoUpload.public_id,
      thumbnailPublicId: thumbnailUpload.public_id,

      duration: videoUpload.duration || 0,

      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      video,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAllVideos = async (
  req,
  res
) => {

  try {

    const search =
      req.query.search || "";

      console.log("Fetching videos with search:", search);

    let query = {
      isPublished: true,
    };



    if (search) {

      query.$text = {
        $search: search,
      };
    }

    console.log("Query:", query);

    const videos =
      await Video.find(query)
        .populate(
          "owner",
          "username"
        )
        .sort({
          createdAt: -1,
        });

        console.log(videos);
    res.json({
      success: true,
      videos,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

const getVideoById = async (req, res) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message: "Invalid video id",
      });
    }

    const video = await Video.findById(
      req.params.id
    ).populate(
      "owner",
      "username avatar subscribersCount"
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.views += 1;
    await video.save();

    res.status(200).json({
      success: true,
      video,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMyVideos = async (req, res) => {
  try {

    const videos = await Video.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};





const deleteVideo = async (
  req,
  res
) => {

  try {

    const video =
      await Video.findById(
        req.params.id
      );

    if (!video) {
      return res.status(404).json({
        message:
          "Video not found",
      });
    }

    if (
      video.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized",
      });
    }

    await cloudinary.uploader.destroy(
      video.videoPublicId,
      {
        resource_type:
          "video",
      }
    );

    await cloudinary.uploader.destroy(
      video.thumbnailPublicId
    );

    await Video.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Video deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};



const toggleLike = async (
  req,
  res
) => {

  try {

    const video =
      await Video.findById(
        req.params.id
      );

    if (!video) {
      return res.status(404).json({
        message:
          "Video not found",
      });
    }

    const userId =
      req.user._id;

    const alreadyLiked =
      video.likes.includes(
        userId
      );

    if (alreadyLiked) {

      video.likes =
        video.likes.filter(
          (id) =>
            id.toString() !==
            userId.toString()
        );

      video.likesCount--;

    } else {

      video.likes.push(
        userId
      );

      video.likesCount++;
    }

    await video.save();

    res.json({
      success: true,
      likesCount:
        video.likesCount,
      liked:
        !alreadyLiked,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getMyVideos,
  deleteVideo,
  toggleLike,
};