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
      return response.rows;
    });
};
