const usersRouter = require("express").Router();
const { handleUrlErrors } = require("../errors/errors.js");
const { getUsers } = require("../controllers/users-controller.js");

usersRouter.route("/").get(getUsers);

usersRouter.use("*", handleUrlErrors);

module.exports = usersRouter;
