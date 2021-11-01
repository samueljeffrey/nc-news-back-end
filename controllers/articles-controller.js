const { selectArticles } = require("../models/articles-model.js");

exports.getArticles = (req, res) => {
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
