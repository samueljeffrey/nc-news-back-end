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
      if (comments.length === 0) {
        selectSingleArticle(req.params.article_id).then((article) => {
          if (article === "Article not found") {
            res.status(404).send({ message: "Article not found" });
          } else {
            res.status(200).send({ comments });
          }
        });
      } else {
        for (let i = 0; i < comments.length; i++) {
          delete comments[i].article_id;
        }
        res.status(200).send({ comments });
      }
    })
    .catch(() => {
      next();
    });
};

exports.postArticleComment = (req, res, next) => {
  selectSingleArticle(req.params.article_id)
    .then((article) => {
      if (article === "Article not found") {
        res.status(404).send({ message: "Article not found" });
      } else {
        insertArticleComment(req.params.article_id, req.body)
          .then((comment) => {
            if (!comment.code) {
              res.status(201).send({ comment });
            } else if (comment.code === "22P02") {
              next();
            } else {
              res.status(400).send({ message: "Malformed request body" });
            }
          })
          .catch((err) => {
            selectSingleUser(req.body.username).then((user) => {
              if (user) {
                res.status(400).send({ message: "Malformed request body" });
              } else {
                res.status(404).send({ message: "Username not found" });
              }
            });
          });
      }
    })
    .catch((err) => {
      if (err.code === "22P02") {
        next();
      } else {
        res.status(400).send({ message: "Malformed request body" });
      }
    });
};
