exports.articleIdError = (err, req, res, next) => {
  if (err === "Article not found") {
    res.status(404).send({ message: err });
  } else if (err === "Invalid article id") {
    res.status(400).send({ message: err });
  } else {
    next(err);
  }
};

exports.commentIdError = (req, res) => {
  res.status(400).send({ message: "Invalid comment id" });
};

exports.requestBodyError = (err, req, res, next) => {
  if (err === "Malformed request body") {
    res.status(400).send({ message: err });
  }
};

exports.handleUrlErrors = (req, res) => {
  res.status(404).send({ message: "Path not found" });
};
