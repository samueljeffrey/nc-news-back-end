const db = require("../db");

exports.removeComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject("not found");
      }
      return "Comment deleted";
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Comment not found");
      return Promise.reject("Invalid comment id");
    });
};

exports.updateSingleComment = (id, newVotes) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [id])
    .then((comment) => {
      if (comment.rows.length > 0) return comment.rows[0].votes;
      return Promise.reject("not found");
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
          return Promise.reject("malformed");
        });
    })
    .catch((err) => {
      if (err === "not found") return Promise.reject("Comment not found");
      if (err === "malformed") return Promise.reject("Malformed request body");
      return Promise.reject("Invalid comment id");
    });
};
