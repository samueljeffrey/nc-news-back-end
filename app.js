const express = require("express");
const apiRouter = require("./routers/api-router.js");
const app = express();
app.use(express.json());
const { handleUrlErrors } = require("./errors/errors.js");

app.use("/api", apiRouter);
app.use("*", handleUrlErrors);

module.exports = app;
