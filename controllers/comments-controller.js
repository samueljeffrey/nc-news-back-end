const { selectComments } = require("../models/comments-model.js");

exports.getComments = (req, res) => {
  selectComments().then((comments) => {
    res.status(200).send({ comments });
  });
};
