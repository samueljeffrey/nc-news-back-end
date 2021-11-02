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
      if (response.rows.length) return response.rows[0];
      else return undefined;
    });
};

exports.countArticleComments = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [id])
    .then((response) => {
      if (response.rows.length) {
        return response.rows;
      } else {
        return [];
      }
    });
};
