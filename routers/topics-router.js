const topicsRouter = require("express").Router();
const { handleUrlErrors } = require("../errors/errors.js");
const { getTopics } = require("../controllers/topics-controller.js");

topicsRouter.route("/").get(getTopics);

topicsRouter.use("*", handleUrlErrors);

module.exports = topicsRouter;
