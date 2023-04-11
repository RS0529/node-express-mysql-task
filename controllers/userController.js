const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwtSecret = "your_jwt_secret_key";
const User = db.users;


// register api
exports.createUser = async (req, res) => {
//   const password = req.body.password;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   let users = {
//     name: req.body.name,
//     email: req.body.email,
//     password: hashedPassword,
//   };
//   const user = await User.create(users);
//   res.status(200).send({message: 'User Register Succesfully', data: user});
//   console.log(user);
const {name, email, password } = req.body;

try {
  // Check if user with the same email already exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ message: "User registered successfully" , data: user});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server Error");
}
};

//login api


exports.userLogin = async (req, res) =>{
     const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ message: "User login successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

}