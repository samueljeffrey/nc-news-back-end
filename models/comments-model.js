const db = require("../db");

exports.removeComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [id])
    .then((response) => {
      if (response.rows.length === 0) {
        return "Comment was not found";
      } else if (response.rows.length) {
        return "Comment deleted";
      }
    })
    .catch((err) => {
      return undefined;
    });
};
