const db = require("../db");

exports.selectArticles = () => {
  return db.query(`SELECT * FROM articles`).then((response) => {
    return response.rows;
  });
};
