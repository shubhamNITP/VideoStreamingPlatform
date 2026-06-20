const mongoose = require("mongoose");

const commentSchema =
  new mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
        trim: true,
      },

      owner: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      video: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Comment",
    commentSchema
  );