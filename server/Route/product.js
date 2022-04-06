const router = require("express").Router();
const {
  isAdmin,
  hasAuthorization,
  isAuth,
} = require("../Helpers/authenticate");

const { userById } = require("../Controllers/user");
const { create } = require("../Controllers/product");

router.param("userId", userById);

router.post(
  "/product/create/:userId",
  hasAuthorization,
  isAuth,
  isAdmin,
  create
);

module.exports = router;
