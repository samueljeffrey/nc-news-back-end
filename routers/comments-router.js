const commentsRouter = require("express").Router();
const { handleUrlErrors } = require("../errors/errors.js");
const { getComments } = require("../controllers/comments-controller.js");

commentsRouter.route("/").get(getComments);

commentsRouter.use("*", handleUrlErrors);

module.exports = commentsRouter;
