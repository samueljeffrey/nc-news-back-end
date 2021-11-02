const articlesRouter = require("express").Router();
const { handleUrlErrors, articleIdError } = require("../errors/errors.js");
const {
  getArticles,
  getSingleArticle,
  patchSingleArticle,
} = require("../controllers/articles-controller.js");

articlesRouter.route("/:article_id").get(getSingleArticle);
articlesRouter.route("/:article_id").patch(patchSingleArticle);

articlesRouter.use("/*", articleIdError);

articlesRouter.route("/").get(getArticles);

articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
