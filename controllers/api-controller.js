const data = require("../endpoints.js");

exports.getApi = (req, res) => {
  res.status(200).send(JSON.stringify(data));
};
