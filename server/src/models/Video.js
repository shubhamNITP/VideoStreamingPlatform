const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 5000,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },


    videoPublicId: {
      type: String,
      required: true,
    },

    thumbnailPublicId: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Gaming",
        "Music",
        "Technology",
        "Entertainment",
        "Sports",
        "News",
        "Other",
      ],
    },

    views: {
      type: Number,
      default: 0,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    duration: {
      type: Number, // seconds
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
videoSchema.index({ title: "text", description: "text" });
videoSchema.index({ category: 1 });
videoSchema.index({ owner: 1 });
videoSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Video", videoSchema);