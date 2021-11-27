const { selectUsers, selectSingleUser } = require("../models/users-model.js");

exports.getUsers = (req, res) => {
  selectUsers().then((users) => {
    users.forEach((user) => {
      delete user.name;
      delete user.avatar_url;
    });
    res.status(200).send({ users });
  });
};

exports.getSingleUser = (req, res, next) => {
  selectSingleUser(req.params.username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
