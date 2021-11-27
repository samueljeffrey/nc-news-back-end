const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const {
  handleUrlErrors,
  articleIdError,
  requestBodyError,
} = require("../errors/errors.js");
const { getApi } = require("../controllers/api-controller.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.route("/").get(getApi);

apiRouter.use("*", articleIdError);
apiRouter.use("*", requestBodyError);
apiRouter.use("*", handleUrlErrors);

module.exports = apiRouter;
