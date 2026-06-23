const User = require("../models/User");
const Video = require("../models/Video");
const Subscription = require("../models/Subscription");



const getUserProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        ).select(
          "username email createdAt"
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const subscriberCount =
        await Subscription.countDocuments({
          channel:
            req.params.id,
        });

      const videoCount =
        await Video.countDocuments({
          owner:
            req.params.id,
        });

      res.json({
        success: true,

        user,

        subscriberCount,

        videoCount,
      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};


const getUserVideos =
  async (req, res) => {

    try {

      const videos =
        await Video.find({
          owner:
            req.params.id,
        })
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        videos,
      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};

module.exports = {
  getUserProfile,
  getUserVideos,
};