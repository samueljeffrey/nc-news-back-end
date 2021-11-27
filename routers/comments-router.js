const commentsRouter = require("express").Router();
const {
  deleteComment,
  patchSingleComment,
} = require("../controllers/comments-controller.js");

commentsRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .patch(patchSingleComment);

module.exports = commentsRouter;
