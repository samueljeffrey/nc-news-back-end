const db = require("../db");

exports.selectTopics = () => {
  return db
    .query(`SELECT * FROM topics`)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return "Database is not set up";
    });
};
