const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 1,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      min: 6,
      max: 32,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 32,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
    },
    from: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    coverPicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    followers: [{ type: ObjectId, ref: "User" }],
    followings: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
