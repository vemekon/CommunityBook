const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 1,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
