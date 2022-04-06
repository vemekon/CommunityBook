const { boolean } = require("joi");
const mongoose = require("mongoose");
const category = require("./category");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      text:true,
      max: 32,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index:true,
      
    },
    description: {
      type: String,
      required: true,
      max: 2000,
      index:true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,

      max: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    category:{
      type: ObjectId,
      ref: category,
    },
    quantity: {
      type: Number,
    },
    sold:{
      type: Number,
      default:0,
    },
    shipping: {
      enum:["Yes" , "No"],
      type: String,
    },
    images:{
      type: Array
    },
    color:{
      type: String,
      enum:["Blue", "Black","Silver","White"]
    }, 
    Brand:{
      type: String,
      enum:["Apple", "Lenovo","HP","Sumsung"]
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
