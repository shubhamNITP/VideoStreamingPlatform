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
  deleteComment
} = require(
  "../controllers/comment.controller"
);



router.get(
  "/:videoId",
  getComments
);

router.delete(
  "/:commentId",
  protect,
  deleteComment
);

router.post(
  "/:videoId",
  protect,
  addComment
);

module.exports =
  router;