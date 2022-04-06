const router = require("express").Router();
const {
  signinAccessToken,
  hasAuthorization,
} = require("../Helpers/authenticate");

const { userById, register, login } = require("../Controllers/user");

router.post("/register", register);
router.post("/login", login);
router.param("userId", userById);

module.exports = router;
