const { removeComment } = require("../models/comments-model.js");

exports.deleteComment = (req, res, next) => {
  removeComment(req.params.comment_id).then((message) => {
    if (message === "Comment deleted") {
      res.status(204).send();
    } else if (message === "Comment was not found") {
      res.status(400).send({ message });
    } else {
      next();
    }
  });
};
