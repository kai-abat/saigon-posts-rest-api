const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postBucketSchema = new Schema(
  {
    attachment: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    post: {
      type: String,
      required: true,
    },
    bucket: [postBucketSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
