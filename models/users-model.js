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
      if (typeof username !== "string") {
        return "Invalid username";
      } else {
        return response.rows[0];
      }
    });
};
