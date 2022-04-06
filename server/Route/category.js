const router = require("express").Router();
const {
  isAdmin,
  hasAuthorization,
  isAuth,
} = require("../Helpers/authenticate");

const { userById } = require("../Controllers/user");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../Controllers/category");

router.post("/category/:userId", hasAuthorization, isAdmin, isAuth, create);

router.get("/categories", list);

router.get("/category/:id", read);
router.put("/category/:userId", hasAuthorization, isAuth, isAdmin, update);
router.delete(
  "/category/:id/:userId",
  hasAuthorization,
  isAuth,

  remove
);

router.param("userId", userById);

module.exports = router;
