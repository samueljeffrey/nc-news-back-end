const db = require("../db");

exports.removeComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [id])
    .then((response) => {
      if (response.rows.length === 0) {
        return "Comment not found";
      } else if (response.rows.length) {
        return "Comment deleted";
      }
    })
    .catch((err) => {
      return undefined;
    });
};

exports.updateSingleComment = (id, newVotes) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [id])
    .then((comment) => {
      return comment.rows[0].votes;
    })
    .then((currentVotes) => {
      return db
        .query(
          `UPDATE comments SET votes = $1 WHERE comment_id = $2 RETURNING *;`,
          [currentVotes + newVotes, id]
        )
        .then((updatedComment) => {
          return updatedComment.rows[0];
        })
        .catch(() => {
          return undefined;
        });
    });
};
