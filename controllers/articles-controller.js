const {
  selectAllArticles,
  selectSingleArticle,
  selectCommentsSingleArticle,
  updateSingleArticle,
  insertArticleComment,
} = require("../models/articles-model.js");
const { selectTopics } = require("../models/topics-model.js");
const { selectSingleUser } = require("../models/users-model.js");

exports.getSingleArticle = (req, res, next) => {
  selectSingleArticle(req.params.article_id)
    .then((article) => {
      if (article === "Article not found") {
        res.status(404).send({ message: "Article not found" });
      } else {
        selectCommentsSingleArticle(article.article_id)
          .then((comments) => {
            article.comment_count = comments.length;
            return article;
          })
          .then((article) => {
            res.status(200).send({ article });
          });
      }
    })
    .catch((err) => {
      next();
    });
};

exports.patchSingleArticle = (req, res, next) => {
  updateSingleArticle(req.params.article_id, req.body.inc_votes)
    .then((article) => {
      if (article === "Article not found") {
        res.status(404).send({ message: "Article not found" });
      } else if (article === "Invalid input") {
        res.status(400).send({ message: "Invalid input" });
      } else if (article) {
        selectCommentsSingleArticle(article.article_id)
          .then((comments) => {
            article.comment_count = comments.length;
            return article;
          })
          .then((article) => {
            res.status(201).send({ article });
          });
      } else {
        next();
      }
    })
    .catch(() => {
      res.status(400).send({ message: "Invalid article id" });
    });
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      if (articles.length === 0) {
        selectTopics().then((topics) => {
          let topicExists = false;
          for (let i = 0; i < topics.length; i++) {
            if (topics[i].slug === topic) {
              topicExists = true;
            }
          }
          if (topicExists) {
            res.status(200).send({ articles });
          } else {
            res.status(404).send({ message: "Topic not found" });
          }
        });
      } else {
        for (let i = 0; i < articles.length; i++) {
          articles[i].comment_count = parseFloat(articles[i].comment_count);
        }
        res.status(200).send({ articles });
      }
    })
    .catch(() => {
      res.status(400).send({ message: "Invalid query in request" });
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
            res.status(200).send({ message: "No comments" });
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
