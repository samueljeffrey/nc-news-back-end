const {
  selectAllArticles,
  selectSingleArticle,
  insertSingleArticle,
  removeArticle,
  selectCommentsSingleArticle,
  updateSingleArticle,
  insertArticleComment,
} = require("../models/articles-model.js");
const { selectSingleUser } = require("../models/users-model.js");

exports.getSingleArticle = (req, res, next) => {
  selectSingleArticle(req.params.article_id)
    .then((article) => {
      selectCommentsSingleArticle(article.article_id)
        .then((comments) => {
          article.comment_count = comments.length;
          return article;
        })
        .then((article) => {
          res.status(200).send({ article });
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchSingleArticle = (req, res, next) => {
  updateSingleArticle(req.params.article_id, req.body)
    .then((article) => {
      selectCommentsSingleArticle(article.article_id)
        .then((comments) => {
          article.comment_count = comments.length;
          return article;
        })
        .then((article) => {
          res.status(201).send({ article });
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSingleArticle = (req, res, next) => {
  insertSingleArticle(req.body)
    .then((article) => {
      selectCommentsSingleArticle(article.article_id)
        .then((comments) => {
          article.comment_count = comments.length;
          return article;
        })
        .then((article) => {
          res.status(201).send({ article });
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteSingleArticle = (req, res, next) => {
  removeArticle(req.params.article_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      articles.forEach((article) => {
        article.comment_count = parseInt(article.comment_count);
      });
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  selectCommentsSingleArticle(req.params.article_id)
    .then((comments) => {
      for (let i = 0; i < comments.length; i++) {
        delete comments[i].article_id;
      }
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleComment = (req, res, next) => {
  insertArticleComment(req.params.article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
