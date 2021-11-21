const db = require("../db");

exports.selectSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        return response.rows[0];
      } else {
        return "Article not found";
      }
    });
};

exports.updateSingleArticle = (id, newVotes) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((article) => {
      if (article.rows[0] === undefined) return undefined;
      return article.rows[0].votes;
    })
    .then((currentVotes) => {
      if (currentVotes === undefined) return undefined;
      return db.query(
        `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`,
        [newVotes + currentVotes, id]
      );
    })
    .then((updatedArticle) => {
      if (updatedArticle === undefined) return undefined;
      return updatedArticle.rows[0];
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
      return response.rows;
    })
    .catch(() => {
      return undefined;
    });
};

exports.selectCommentsSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [id])
    .then((response) => {
      if (response.rows) return response.rows;
      else return [];
    })
    .catch(() => {
      return undefined;
    });
};

exports.insertArticleComment = (id, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES($1, $2, $3) RETURNING *;`,
      [id, body.username, body.body]
    )
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      return err;
    });
};
