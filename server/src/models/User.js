const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // don't return password by default
    },

    avatar: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    subscribersCount: {
      type: Number,
      default: 0,
    },

    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// indexes
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);