const router = require("express").Router();
const {
  isAdmin,
  hasAuthorization,
  isAuth,
} = require("../Helpers/authenticate");

const { userById } = require("../Controllers/user");
const { create, read, update, remove, list } = require("../Controllers/sub");

router.post("/sub/:userId", hasAuthorization, isAdmin, isAuth, create);

router.get("/categories", list);

router.get("/sub/:id", read);
router.put("/sub/:userId", hasAuthorization, isAuth, isAdmin, update);
router.delete(
  "/sub/:id/:userId",
  hasAuthorization,
  isAuth,

  remove
);

router.param("userId", userById);

module.exports = router;
