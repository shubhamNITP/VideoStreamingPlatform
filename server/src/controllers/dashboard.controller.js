const Video =
  require("../models/Video");

const Comment =
  require("../models/Comment");

const getDashboard =
  async (req, res) => {

    try {

      const videos =
        await Video.find({
          owner: req.user._id,
        });

      const totalVideos =
        videos.length;

      const totalViews =
        videos.reduce(
          (sum, video) =>
            sum + video.views,
          0
        );

      const totalLikes =
        videos.reduce(
          (sum, video) =>
            sum + video.likesCount,
          0
        );

      const videoIds =
        videos.map(
          (video) =>
            video._id
        );

      const totalComments =
        await Comment.countDocuments({
          video: {
            $in: videoIds,
          },
        });

      res.json({
        success: true,

        stats: {
          totalVideos,
          totalViews,
          totalLikes,
          totalComments,
        },
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
  getDashboard,
};