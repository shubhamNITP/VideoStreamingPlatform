const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middlewares/auth.middleware"
  );

const {
  toggleSubscription,
  getSubscriberCount,
  getSubscriptionStatus,
} = require(
  "../controllers/subscription.controller"
);

router.post(
  "/:channelId",
  protect,
  toggleSubscription
);

router.get(
  "/:channelId/count",
  getSubscriberCount
);

router.get(
  "/:channelId/status",
  protect,
  getSubscriptionStatus
);

module.exports = router;