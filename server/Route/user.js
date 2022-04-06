const router = require("express").Router();

const {
  signinAccessToken,
  hasAuthorization,
  isAuth,
} = require("../Helpers/authenticate");

const {
  userById,
  register,
  login,
  follow,
  unfollow,
  userDetails,
} = require("../Controllers/user");

router.post("/register", register);
router.post("/login", login);

router.param("userId", userById);

router.get("/secret/:userId", (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.post("/secrets/:userId", hasAuthorization, isAuth, (req, res) => {
  res.json({
    user: req.profile,
    user2: req.auth,
  });
});
router.post("/follow/:userId", hasAuthorization, follow);
router.post("/unfollow/:userId", hasAuthorization, unfollow);
//router.get("/user/:userId", hasAuthorization, userDetails);
router.get("/user/:userId", userDetails);

module.exports = router;
