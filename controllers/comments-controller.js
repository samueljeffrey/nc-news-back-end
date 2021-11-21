const {
  removeComment,
  updateSingleComment,
} = require("../models/comments-model.js");

exports.deleteComment = (req, res, next) => {
  removeComment(req.params.comment_id).then((message) => {
    if (message === "Comment deleted") {
      res.status(204).send();
    } else if (message === "Comment not found") {
      res.status(404).send({ message });
    } else {
      next();
    }
  });
};

exports.patchSingleComment = (req, res, next) => {
  updateSingleComment(req.params.comment_id, req.body.inc_votes)
    .then((comment) => {
      if (!comment) {
        res.status(400).send({ message: "Malformed request body" });
      } else {
        delete comment.article_id;
        res.status(200).send({ comment });
      }
    })
    .catch(() => {
      res.status(400).send({ message: "Invalid comment id" });
    });
};
