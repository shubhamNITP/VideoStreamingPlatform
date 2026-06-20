const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middlewares/auth.middleware"
  );

const {
  addComment,
  getComments,
} = require(
  "../controllers/comment.controller"
);

router.get(
  "/:videoId",
  getComments
);

router.post(
  "/:videoId",
  protect,
  addComment
);

module.exports =
  router;