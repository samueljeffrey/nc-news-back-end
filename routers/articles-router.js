const articlesRouter = require("express").Router();
const { handleUrlErrors, articleIdError } = require("../errors/errors.js");
const {
  getSingleArticle,
  patchSingleArticle,
  postSingleArticle,
  deleteSingleArticle,
  getAllArticles,
  getArticleComments,
  postArticleComment,
} = require("../controllers/articles-controller.js");

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

articlesRouter
  .route("/:article_id")
  .get(getSingleArticle)
  .patch(patchSingleArticle)
  .delete(deleteSingleArticle);

articlesRouter.route("/").get(getAllArticles).post(postSingleArticle);
articlesRouter.use("/*", articleIdError);
articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
