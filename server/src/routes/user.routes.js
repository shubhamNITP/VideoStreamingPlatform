const express =
  require("express");

const router =
  express.Router();

const {
  getUserProfile,
  getUserVideos,
} = require(
  "../controllers/user.controller"
);

router.get(
  "/:id/profile",
  getUserProfile
);

router.get(
  "/:id/videos",
  getUserVideos
);

module.exports =
  router;