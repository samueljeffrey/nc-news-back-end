const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const { handleUrlErrors } = require("../errors/errors.js");
const { getApi } = require("../controllers/controller.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.route("/").get(getApi);
apiRouter.use("*", handleUrlErrors);

module.exports = apiRouter;
