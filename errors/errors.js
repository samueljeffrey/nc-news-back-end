exports.handleUrlErrors = (req, res) => {
  res.status(404).send({ message: "Path not found" });
};

exports.articleIdError = (req, res) => {
  res.status(400).send({ message: "Incorrect article id" });
};
