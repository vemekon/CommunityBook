const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../Models/user");
const mongoose = require("mongoose");

exports.signinAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) throw createError.NotFound("user not found");

    const payload = { user };
    const secret = "some";
    const option = {};

    jwt.sign(payload, process.env.SECRET, option, (err, token) => {
      if (err) return;

      resolve(token);
    });
  });
};
exports.hasAuthorization = (req, res, next) => {
  console.log("has authorisation", req.headers["authorization"]);
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const token = req.headers["authorization"];
  console.log("has authorisation two");
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) return next(createError.Unauthorized());

    User.findById(payload.user._id).then((userData) => {
      req.auth = userData;

      next();
    });
  });
};

exports.isAdmin = (req, res, next) => {
  //console.log("isadmin");
  if (req.profile.role !== "Admin")
    return next(createError.Unauthorized("Admin resource"));
  next();
};
exports.isAuth = (req, res, next) => {
  //let user = req.profile && req.auth;
  if (req.auth._id.toString() !== req.profile._id.toString())
    return next(createError.Unauthorized());
  next();
};
