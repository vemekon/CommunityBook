const router = require("express").Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  signinAccessToken,
  hasAuthorization,
} = require("../Helpers/authenticate");

const User = require("../Models/user");
const { userSchema, loginSchema } = require("../Helpers/joi");

exports.register = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) throw createError.Conflict("User already exist");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);
    result.password = hashedPassword;
    const user = new User(result);
    const savedUser = await user.save();
    // const token = await jwt.sign({ savedUser }, process.env.SECRET, {
    //   expiresIn: "1h",
    // });
    // if (!token) throw createError.InternalServerError();
    savedUser.password = undefined;
    res.status(200).json({ savedUser });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email });
    console.log(user, "user");
    if (!user) throw createError.NotFound("user not registered");
    const isMatch = await bcrypt.compare(result.password, user.password);
    if (!isMatch) throw createError.Unauthorized("user and password not valid");
    const token = await signinAccessToken(user);
    //req.auth = user;
    // console.log(req.auth);
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid user name or password"));
    next(error);
  }
};

exports.userById = async (req, res, next, id) => {
  console.log(req.params, "id find");
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw createError.NotFound("user not found");
    req.profile = user;

    next();
  } catch (error) {
    next(error);
  }
};
exports.userDetails = async (req, res) => {
  console.log(req.params, "ho");
  res.status(200).json(req.profile);
};

// exports.follow = async (req, res) => {
//   //console.log(req.profile, req.auth);
//   function userSearch(item) {
//     //console.log(item._id.toString(), req.profile._id.toString());
//     if (item._id.toString() == req.profile._id.toString()) {
//       return true;
//     }
//   }
//   try {
//     if (req.auth.followers.map(userSearch).includes(true)) {
//       res.status(400).json({ a: "already followed" });
//       return;
//     }

//     await User.findOneAndUpdate(
//       { _id: req.auth._id },
//       { $push: { followers: req.profile } },
//       { upsert: true }
//     );
//     await User.findOneAndUpdate(
//       { _id: req.profile._id },
//       { $push: { followings: req.auth } },
//       { upsert: true }
//     );

//     res.status(200).json({ a: req.auth.followers, b: req.profile.followings });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };
exports.follow = async (req, res) => {
  try {
    if (
      req.auth.followers.some(
        (item) => item._id.toString() == req.profile._id.toString()
      )
    ) {
      res.status(400).json({ a: "already followed" });
      return;
    }

    await User.findOneAndUpdate(
      { _id: req.auth._id },
      { $push: { followers: req.profile } },
      { upsert: true }
    );
    await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { followings: req.auth } },
      { upsert: true }
    );

    res.status(200).json({ a: req.auth.followers, b: req.profile.followings });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.unfollow = async (req, res) => {
  try {
    if (
      !req.auth.followers.some(
        (item) => item._id.toString() == req.profile._id.toString()
      )
    ) {
      res.status(400).json({ a: "already unfollowed" });
      return;
    }

    await User.findOneAndUpdate(
      { _id: req.auth._id },
      { $pullAll: { followers: [req.profile] } },
      { upsert: true }
    );
    await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $pullAll: { followings: [req.auth] } },
      { upsert: true }
    );

    res.status(200).json({ a: req.auth.followers, b: req.profile.followings });
  } catch (error) {
    res.status(400).send(error);
  }
};

// exports.unfollow = async (req, res) => {
//   //console.log(req.profile, req.auth);
//   function userSearch(item) {
//     //console.log(item._id.toString(), req.profile._id.toString());
//     if (item._id.toString() == req.profile._id.toString()) {
//       return true;
//     }
//   }
//   try {
//     if (!req.auth.followers.map(userSearch).includes(true)) {
//       res.status(400).json({ a: "already unfollowed" });
//       return;
//     }
//     console.log("got unfollowed");
//     await User.findOneAndUpdate(
//       { _id: req.auth._id },
//       { $pullAll: { followers: [req.profile] } },
//       { upsert: true }
//     );
//     await User.findOneAndUpdate(
//       { _id: req.profile._id },
//       { $pullAll: { followings: [req.auth] } },
//       { upsert: true }
//     );

//     res.status(200).json({ a: req.auth.followers, b: req.profile.followings });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };
