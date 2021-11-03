const {
  selectAllArticles,
  selectSingleArticle,
  selectCommentsSingleArticle,
  updateSingleArticle,
  insertArticleComment,
} = require("../models/articles-model.js");

exports.getSingleArticle = (req, res, next) => {
  selectSingleArticle(req.params.article_id).then((article) => {
    if (article) {
      selectCommentsSingleArticle(article.article_id)
        .then((comments) => {
          article.comment_count = comments.length;
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
      }
    );
  }
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectAllArticles(sort_by, order, topic).then((articles) => {
    if (articles) {
      if (articles.length === 0) {
        res.status(200).send({ message: "No applicable articles" });
      } else {
        for (let i = 0; i < articles.length; i++) {
          articles[i].comment_count = parseFloat(articles[i].comment_count);
        }
        res.status(200).send({ articles });
      }
    } else {
      res.status(400).send({ message: "Invalid query in request" });
    }
  });
};

exports.getArticleComments = (req, res, next) => {
  selectCommentsSingleArticle(req.params.article_id).then((comments) => {
    if (comments) {
      if (comments.length === 0) {
        res.status(200).send({ message: "No comments" });
      } else {
        for (let i = 0; i < comments.length; i++) {
          delete comments[i].article_id;
        }
        res.status(200).send({ comments });
      }
    } else {
      next();
    }
  });
};

exports.postArticleComment = (req, res, next) => {
  if (
    typeof req.body.body === "string" &&
    typeof req.body.username === "string"
  ) {
    insertArticleComment(req.params.article_id, req.body).then((comment) => {
      if (comment) {
        res.status(201).send({ comment });
      } else {
        next();
      }
    });
  } else {
    res.status(400).send({ message: "Invalid request body" });
  }
};
