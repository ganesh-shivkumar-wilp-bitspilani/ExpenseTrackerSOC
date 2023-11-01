const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {constants} = require("../constants")


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      res.status(constants.BAD_REQUEST);
      throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
      const jwtToken = jwt.sign(
      {
        user: {
        username: user.username,
        email: user.email,
        id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "10m" }
      );
      res.status(constants.SUCCESS).json({ jwtToken });
  } else {
      res.status(constants.UNAUTHORIZED);
      throw new Error("email or password is not valid");
  }
});

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(constants.BAD_REQUEST);
    throw new Error("All fields are mandatory!");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(constants.BAD_REQUEST);
    throw new Error("User already registered!");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: encryptedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(constants.CREATED).json({ _id: user.id, email: user.email });
  } else {
    res.status(constants.BAD_REQUEST);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };