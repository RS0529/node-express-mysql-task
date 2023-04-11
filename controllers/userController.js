const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.users;

const createUser = async (req, res) => {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  let users = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await User.create(users);
  res.status(200).send({message: 'User Register Succesfully', data: user});
  console.log(user);
};

module.exports = {
  createUser,
};
