const articlesRouter = require("express").Router();
const { handleUrlErrors } = require("../errors/errors.js");
const { getArticles } = require("../controllers/articles-controller.js");

articlesRouter.route("/").get(getArticles);

articlesRouter.use("*", handleUrlErrors);

module.exports = articlesRouter;
