const db = require("../index.js");
const format = require("pg-format");

const dropTables = () => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    });
};

const createTables = () => {
  return db
    .query(
      `CREATE TABLE topics (
    slug VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
    description VARCHAR(255) NOT NULL      
  );`
    )
    .then(() => {
      return db.query(`CREATE TABLE users (
    username VARCHAR(20) UNIQUE PRIMARY KEY NOT NULL,
    AVATAR_URL VARCHAR(500),
    name VARCHAR(255) NOT NULL
  );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    body VARCHAR(10000) NOT NULL,
    votes INT DEFAULT 0,
    topic VARCHAR(255) REFERENCES topics(slug),
    author VARCHAR(20) REFERENCES users(username),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(20) REFERENCES users(username),
    article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
    votes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR(1000) NOT NULL
  );`);
    });
};

const insertTopicData = (topicData) => {
  const topicQuery = format(
    `INSERT INTO topics(slug, description) VALUES %L RETURNING *;`,
    topicData.map((topic) => [topic.slug, topic.description])
  );
  return db.query(topicQuery);
};

const insertUserData = (userData) => {
  const userQuery = format(
    `INSERT INTO users(username, avatar_url, name) VALUES %L RETURNING *;`,
    userData.map((user) => [user.username, user.avatar_url, user.name])
  );
  return db.query(userQuery);
};

const insertArticleData = (articleData) => {
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

const insertCommentData = (commentData) => {
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
  dropTables,
  createTables,
  insertTopicData,
  insertUserData,
  insertArticleData,
  insertCommentData,
};
