// routes/video.routes.js

const express = require("express");

const protect = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getMyVideos,
  deleteVideo,
  toggleLike,
  updateVideo,
} = require("../controllers/video.controller");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

router.get(
  "/",
  getAllVideos
);

router.get(
  "/my-videos",
  protect,
  getMyVideos
);


router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateVideo
);

router.post(
  "/:id/like",
  protect,
  toggleLike
);

router.delete(
  "/:id",
  protect,
  deleteVideo
);

router.get(
  "/:id",
  getVideoById
);

module.exports = router;