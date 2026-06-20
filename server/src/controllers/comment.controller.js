const Comment =
  require(
    "../models/Comment"
  );

const addComment =
  async (req, res) => {

    try {

      const { content } =
        req.body;

      if (!content?.trim()) {
        return res.status(400).json({
          message:
            "Comment cannot be empty",
        });
      }

      const comment =
        await Comment.create({
            content,
            owner: req.user._id,
            video: req.params.videoId,
        });

        const populatedComment =
        await Comment.findById(
            comment._id
        ).populate(
            "owner",
            "_id username"
        );

        res.status(201).json({
        success: true,
        comment:
            populatedComment,
        });
    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};

const getComments =
  async (req, res) => {

    try {

      const comments =
        await Comment.find({
          video:
            req.params.videoId,
        })
          .populate(
            "owner",
            "_id username"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        comments,
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


const deleteComment =
  async (req, res) => {

    try {

      const comment =
        await Comment.findById(
          req.params.commentId
        );

      if (!comment) {
        return res.status(404).json({
          message:
            "Comment not found",
        });
      }

      if (
        comment.owner.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message:
            "Not authorized",
        });
      }

      await Comment.findByIdAndDelete(
        req.params.commentId
      );

      res.json({
        success: true,
        message:
          "Comment deleted",
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
  addComment,
  getComments,
  deleteComment,
};