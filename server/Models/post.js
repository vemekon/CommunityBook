const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: ObjectId,
      ref: "User",
    },

    desc: {
      type: String,

      max: 500,
    },

    img: {
      type: String,
    },

    likes: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
