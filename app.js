const express = require("express");
const apiRouter = require("./routers/api-router.js");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { handleUrlErrors } = require("./errors/errors.js");

app.use("/api", apiRouter);
app.use("*", handleUrlErrors);

module.exports = app;
