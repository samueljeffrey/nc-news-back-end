const db = require("../db");

exports.selectArticles = () => {
  return db.query(`SELECT * FROM articles`).then((response) => {
    return response.rows;
  });
};

exports.selectSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
};

exports.countArticleComments = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [id])
    .then((response) => {
      // return response.rows;
      if (response.rows && response.rows.length) {
        return response.rows.length;
      } else {
        return 0;
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
