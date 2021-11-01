const db = require("./db");
const format = require("pg-format");

const insertTopicData = () => {
  const topicQuery = format(
    `INSERT INTO topics(slug, description) VALUES %L RETURNING *;`,
    topicData.map((topic) => [topic.slug, topic.description])
  );
  return db.query(topicQuery);
};

const insertUserData = () => {
  const userQuery = format(
    `INSERT INTO users(username, avatar_url, name) VALUES %L RETURNING *;`,
    userData.map((user) => [user.username, user.avatar_url, user.name])
  );
  return db.query(userQuery);
};

const insertArticleData = () => {
  const articleQuery = format(
    `INSERT INTO articles(title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
    articleData.map((article) => [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ])
  );
  return db.query(articleQuery);
};

const insertCommentData = () => {
  const commentQuery = format(
    `INSERT INTO comments(author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
    commentData.map((comment) => [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ])
  );
  return db.query(commentQuery);
};

module.exports = {
  insertTopicData,
  insertUserData,
  insertArticleData,
  insertCommentData,
};
