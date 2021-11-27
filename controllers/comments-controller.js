const {
  removeComment,
  updateSingleComment,
} = require("../models/comments-model.js");

exports.deleteComment = (req, res, next) => {
  removeComment(req.params.comment_id)
    .then((message) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchSingleComment = (req, res, next) => {
  updateSingleComment(req.params.comment_id, req.body.inc_votes)
    .then((comment) => {
      delete comment.article_id;
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
