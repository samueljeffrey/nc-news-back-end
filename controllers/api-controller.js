exports.getApi = (req, res) => {
  res.status(200).send({ message: "Connected to server" });
};
