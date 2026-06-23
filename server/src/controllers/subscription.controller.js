const Subscription =
  require(
    "../models/Subscription"
  );



  const toggleSubscription =
  async (req, res) => {

    try {

      const subscriber =
        req.user._id;

      const channel =
        req.params.channelId;

      if (
        subscriber.toString() ===
        channel
      ) {

        return res
          .status(400)
          .json({
            message:
              "Cannot subscribe to yourself",
          });
      }

      const existing =
        await Subscription.findOne({
          subscriber,
          channel,
        });

      if (existing) {

        await Subscription.findByIdAndDelete(
          existing._id
        );

        return res.json({
          success: true,
          subscribed: false,
        });
      }

      await Subscription.create({
        subscriber,
        channel,
      });

      res.json({
        success: true,
        subscribed: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};


const getSubscriberCount =
  async (req, res) => {

    try {

      const count =
        await Subscription
          .countDocuments({
            channel:
              req.params.channelId,
          });

      res.json({
        success: true,
        count,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};


const getSubscriptionStatus =
  async (req, res) => {

    try {

      const subscription =
        await Subscription.findOne({
          subscriber:
            req.user._id,

          channel:
            req.params.channelId,
        });

      res.json({
        success: true,
        subscribed:
          !!subscription,
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
  toggleSubscription,
  getSubscriberCount,
  getSubscriptionStatus,
};