const db = require("../db");

exports.removeComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [id])
    .then((response) => {
      console.log(response);
      return "Comment deleted";
    })
    .catch((err) => {
      return err;
    });
};
