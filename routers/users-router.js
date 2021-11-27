const usersRouter = require("express").Router();
const { handleUrlErrors } = require("../errors/errors.js");
const {
  getUsers,
  getSingleUser,
} = require("../controllers/users-controller.js");

usersRouter.route("/:username").get(getSingleUser);
usersRouter.route("/").get(getUsers);

module.exports = usersRouter;
