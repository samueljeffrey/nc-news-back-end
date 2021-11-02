const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  const {
    dropTables,
    createTables,
    insertTopicData,
    insertUserData,
    insertArticleData,
    insertCommentData,
  } = require("../functions/functions.js");

  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      return insertTopicData(topicData);
    })
    .then(() => {
      return insertUserData(userData);
    })
    .then(() => {
      return insertArticleData(articleData);
    })
    .then(() => {
      return insertCommentData(commentData);
    });
};

module.exports = seed;
