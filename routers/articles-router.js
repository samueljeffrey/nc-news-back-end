const articlesRouter = require("express").Router();
const { handleUrlErrors, articleIdError } = require("../errors/errors.js");
const {
  getArticles,
  getSingleArticle,
} = require("../controllers/articles-controller.js");

articlesRouter.route("/:article_id").get(getSingleArticle);
articlesRouter.use("/*", articleIdError);

articlesRouter.route("/").get(getArticles);

articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
