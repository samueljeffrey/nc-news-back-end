const db = require("../db");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS topics;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
        slug VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
        description VARCHAR(255) NOT NULL      
      );`);
    })
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id PRIMARY KEY SERIAL,
        author VARCHAR(20) REFERENCES users(username),
        auticle_id INT REFERENCES articles(article_id),
        votes INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        body VARCHAR (1000) NOT NULL
      );`);
    })
    .then(() => {
      return insertTopicData;
    })
    .then(() => {
      return insertUserData;
    })
    .then(() => {
      return insertArticleData;
    })
    .then(() => {
      return insertCommentData;
    });
};

module.exports = seed;
