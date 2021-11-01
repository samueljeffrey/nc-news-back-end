const selectTopics = require("../models/model.js");

exports.getApi = (req, res) => {
  res.status(200), send({ message: "Connected to server" });
};

exports.getTopics = (req, res) => {
  selectTopics().then(({ topics }) => {
    res.status(200).send({ topics });
  });
};
