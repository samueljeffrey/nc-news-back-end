const db = require("../db");

exports.selectComments = () => {
  return db.query(`SELECT * FROM comments`).then((response) => {
    return response.rows;
  });
};
