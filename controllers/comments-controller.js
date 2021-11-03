const { removeComment } = require("../models/comments-model.js");

exports.deleteComment = (req, res) => {
  removeComment(req.params.comment_id).then((message) => {
    if (message.code) {
      next();
    } else {
      res.status(204).send();
    }
  });
};
