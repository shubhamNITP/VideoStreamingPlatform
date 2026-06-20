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
            "username"
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
            "username"
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


module.exports = {
  addComment,
  getComments,
};