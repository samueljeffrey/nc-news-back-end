const {
  selectArticles,
  selectSingleArticle,
} = require("../models/articles-model.js");

exports.getArticles = (req, res) => {
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getSingleArticle = (req, res, next) => {
  selectSingleArticle(req.params.article_id).then((article) => {
    if (article.length) {
      res.status(200).send({ article });
    } else {
      next();
    }
  });
};
