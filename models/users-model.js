const db = require("../db");

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users`).then((response) => {
    return response.rows;
  });
};

exports.selectSingleUser = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((response) => {
      return response.rows[0];
    })
    .catch(() => {
      return undefined;
    });
};
