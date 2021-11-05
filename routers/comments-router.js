const commentsRouter = require("express").Router();
const { handleUrlErrors, commentIdError } = require("../errors/errors.js");
const {
  deleteComment,
  patchSingleComment,
} = require("../controllers/comments-controller.js");

commentsRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .patch(patchSingleComment);
commentsRouter.use("/*", commentIdError);

commentsRouter.use("*", handleUrlErrors);

module.exports = commentsRouter;
