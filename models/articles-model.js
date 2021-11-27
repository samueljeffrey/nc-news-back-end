const db = require("../db");
const { selectTopics } = require("./topics-model.js");

exports.selectSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        return response.rows[0];
      } else {
        return Promise.reject("not found");
      }
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Article not found");
      return Promise.reject("Invalid article id");
    });
};

exports.updateSingleArticle = (id, body) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((article) => {
      if (article.rows.length > 0) {
        return article.rows[0].votes;
      } else {
        return Promise.reject("not found");
      }
    })
    .then((currentVotes) => {
      return db.query(
        `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`,
        [body.inc_votes + currentVotes, id]
      );
    })
    .then((updatedArticle) => {
      return updatedArticle.rows[0];
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Article not found");
      if (!/^[0-9]*$/.test(id)) return Promise.reject("Invalid article id");
      return Promise.reject("Malformed request body");
    });
};

exports.insertSingleArticle = (body) => {
  return selectTopics()
    .then((topics) => {
      if (
        body.topic &&
        topics.filter((eachTopic) => eachTopic.slug === body.topic).length > 0
      ) {
        return db
          .query(
            `INSERT INTO articles (title, author, body, topic) VALUES ($1, $2, $3, $4) RETURNING *;`,
            [body.title, body.username, body.body, body.topic]
          )
          .then((response) => {
            return response.rows[0];
          });
      } else if (body.topic) {
        return Promise.reject("topic not found");
      } else {
        return Promise.reject("malformed");
      }
    })
    .catch((err) => {
      if (err === "topic not found") return Promise.reject("Topic not found");
      if (err === "malformed") return Promise.reject("Malformed request body");
      if (err.detail.slice(-8) === '"users".') {
        return Promise.reject("Username not found");
      }
    });
};

exports.removeArticle = (id) => {
  return db
    .query(`DELETE FROM articles WHERE article_id = $1 RETURNING *;`, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        return "done";
      } else {
        return Promise.reject("not found");
      }
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Article not found");
      return Promise.reject("Invalid article id");
    });
};

exports.selectAllArticles = (sort_by = "created_at", order = "DESC", topic) => {
  let articlesQuery =
    "SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id";
  if (topic) articlesQuery += ` WHERE articles.topic = '${topic}'`;
  articlesQuery += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
  return db
    .query(articlesQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        return response.rows;
      } else {
        return selectTopics().then((topics) => {
          if (
            topics.filter((eachTopic) => eachTopic.slug === topic).length > 0
          ) {
            return response.rows;
          } else {
            return Promise.reject("not found");
          }
        });
      }
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Topic not found");
      return Promise.reject("Invalid query in request");
    });
};

exports.selectCommentsSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [id])
    .then((response) => {
      if (response.rows) return response.rows;
      else return "Article not found";
    });
};

exports.insertArticleComment = (id, body) => {
  if (body.username && body.body) {
    return db
      .query(
        `INSERT INTO comments (article_id, author, body) VALUES($1, $2, $3) RETURNING *;`,
        [id, body.username, body.body]
      )
      .then((response) => {
        return response.rows[0];
      });
  }
};
