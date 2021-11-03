const articlesRouter = require("express").Router();
const { handleUrlErrors, articleIdError } = require("../errors/errors.js");
const {
  getSingleArticle,
  patchSingleArticle,
  getAllArticles,
  getArticleComments,
  // postArticleComment,
} = require("../controllers/articles-controller.js");

articlesRouter.route("/:article_id/comments").get(getArticleComments);
// .post(postArticleComment);

articlesRouter
  .route("/:article_id")
  .get(getSingleArticle)
  .patch(patchSingleArticle);

articlesRouter.route("/").get(getAllArticles);
articlesRouter.use("/*", articleIdError);
articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
