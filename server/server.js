const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoute = require("./Route/auth");
const userRoute = require("./Route/user");
const categoryRoute = require("./Route/category");
const productRoute = require("./Route/product");
const postRoute = require("./Route/post");

const createError = require("http-errors");
const bodyParser = require("body-parser");
require("./Helpers/initMongoDb");
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.post("/a", (req, res) => {
  const app = express();
  res.send("register");
  console.log("got here");
});

app.use("/api/user", userRoute);
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

app.use(async (req, res, next) => {
  //const error = new Error("Not found");
  //error.status = 404;
  //next(error);
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(8800, () => console.log("up and running"));
