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
      console.log(username, response);
      if (response.rows.length > 0) return response.rows[0];
      return Promise.reject();
    })
    .catch(() => {
      return Promise.reject("Username not found");
    });
};
