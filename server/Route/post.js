const router = require("express").Router();

const {
  signinAccessToken,
  hasAuthorization,
  isAuth,
} = require("../Helpers/authenticate");

const { userById } = require("../Controllers/user");
const {
  newPost,
  postById,
  updatePost,
  deletePost,
  like,
  timeline,
  userTimeline,
} = require("../Controllers/post");

router.param("userId", userById);
router.param("postId", postById);

router.post("/new", hasAuthorization, newPost);
router.put("/:postId", hasAuthorization, updatePost);
router.delete("/:postId", hasAuthorization, deletePost);
router.get("/like/:postId", hasAuthorization, like);
router.get("/timeline", hasAuthorization, timeline);
router.get("/usertimeline", hasAuthorization, userTimeline);

module.exports = router;
