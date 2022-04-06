const router = require("express").Router();
const createError = require("http-errors");

const User = require("../Models/user");
const Post = require("../Models/post");

exports.postById = async (req, res, next, id) => {
  //console.log(req.params, id);
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) throw createError.NotFound("post not found");
    req.post = post;

    next();
  } catch (error) {
    next(error);
  }
};
exports.newPost = async (req, res) => {
  console.log(req.body);
  try {
    const newPost = new Post(req.body);
    newPost.postedBy = req.auth;
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updatePost = async (req, res) => {
  console.log(req.post.postedBy._id.toString(), req.auth._id.toString());
  try {
    if (req.post.postedBy._id.toString() !== req.auth._id.toString()) {
      res.status(400).json({ error: "you are not authorised" });
      return;
    }
    //     req.post.desc = req.body.desc || req.post.desc;
    //     req.post.img = req.body.img || req.post.img;
    //     await req.post.save();

    await req.post.updateOne({ $set: req.body }, { upsert: true });
    res.status(200).json(req.post);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deletePost = async (req, res) => {
  console.log(req.post.postedBy._id.toString(), req.auth._id.toString());
  try {
    if (req.post.postedBy._id.toString() !== req.auth._id.toString()) {
      res.status(400).json({ error: "you are not authorised" });
      return;
    }
    //     req.post.desc = req.body.desc || req.post.desc;
    //     req.post.img = req.body.img || req.post.img;
    //     await req.post.save();

    await req.post.deleteOne();
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updatePost = async (req, res) => {
  console.log(req.post.postedBy._id.toString(), req.auth._id.toString());
  try {
    if (req.post.postedBy._id.toString() !== req.auth._id.toString()) {
      res.status(400).json({ error: "you are not authorised" });
      return;
    }
    //     req.post.desc = req.body.desc || req.post.desc;
    //     req.post.img = req.body.img || req.post.img;
    //     await req.post.save();

    await req.post.updateOne({ $set: req.body }, { upsert: true });
    res.status(200).json(req.post);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.like = async (req, res) => {
  console.log(req.post.postedBy._id.toString(), req.auth._id.toString());
  try {
    if (req.post.postedBy._id.toString() !== req.auth._id.toString()) {
      res.status(400).json({ error: "you are not authorised" });
      return;
    }
    //     req.post.desc = req.body.desc || req.post.desc;
    //     req.post.img = req.body.img || req.post.img;
    //     await req.post.save();

    await req.post.updateOne({ $set: req.body }, { upsert: true });
    res.status(200).json(req.post);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.like = async (req, res) => {
  try {
    if (
      req.post.likes.some(
        (item) => item._id.toString() == req.auth._id.toString()
      )
    ) {
      req.post.likes.forEach((x) =>
        console.log(x._id.toString(), req.auth._id.toString())
      );

      await Post.findOneAndUpdate(
        { _id: req.post._id },
        { $pullAll: { likes: [req.auth] } },
        { upsert: true }
      );
      console.log(req.post.likes);
      res.status(200).json({ a: "disliked" });
    } else {
      await req.post.likes.push(req.auth);
      await req.post.save();

      res.status(200).json({ a: "liked" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.timeline = async (req, res) => {
  try {
    const userPosts = await Post.find({ postedBy: req.auth });
    const friendPosts = await Promise.all(
      req.auth.followers.map((followers) => {
        return Post.find({ postedBy: followers }).populate("postedBy");
      })
    );
    console.log(...friendPosts);
    res.status(200).json(...friendPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.userTimeline = async (req, res) => {
  try {
    const userPosts = await Post.find({ postedBy: req.auth });

    //console.log([...friendPosts, userPosts]);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};
