const commentsRouter = require("express").Router();
const { handleUrlErrors, commentIdError } = require("../errors/errors.js");
const { deleteComment } = require("../controllers/comments-controller.js");

commentsRouter.route("/:comment_id").delete(deleteComment);
commentsRouter.use("/*", commentIdError);

commentsRouter.use("*", handleUrlErrors);

module.exports = commentsRouter;
