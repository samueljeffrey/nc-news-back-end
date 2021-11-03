const articlesRouter = require("express").Router();
const { handleUrlErrors, articleIdError } = require("../errors/errors.js");
const {
  getSingleArticle,
  patchSingleArticle,
  getAllArticles,
} = require("../controllers/articles-controller.js");

articlesRouter
  .route("/:article_id")
  .get(getSingleArticle)
  .patch(patchSingleArticle);

articlesRouter.route("/").get(getAllArticles);
articlesRouter.use("/*", articleIdError);
articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
