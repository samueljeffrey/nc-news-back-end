const {
  selectAllArticles,
  selectSingleArticle,
  countArticleComments,
  updateSingleArticle,
} = require("../models/articles-model.js");

exports.getSingleArticle = (req, res, next) => {
  selectSingleArticle(req.params.article_id).then((article) => {
    if (article) {
      countArticleComments(article.article_id)
        .then((comments) => {
          article.comment_count = comments;
          return article;
        })
        .then((article) => {
          res.status(200).send({ article });
        });
    } else {
      next();
    }
  });
};

exports.patchSingleArticle = (req, res, next) => {
  if (typeof req.body.inc_votes !== "number") {
    res.status(400).send({ message: "Invalid input" });
  } else {
    updateSingleArticle(req.params.article_id, req.body.inc_votes).then(
      (article) => {
        if (article) {
          countArticleComments(article.article_id)
            .then((comments) => {
              article.comment_count = comments;
              return article;
            })
            .then((article) => {
              res.status(201).send({ article });
            });
        } else {
          next();
        }
      }
    );
  }
};

exports.getAllArticles = (req, res) => {
  selectAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
