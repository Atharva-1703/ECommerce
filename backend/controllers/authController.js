const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // ? validation
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "missing fields",
    });
  }

  // ? check if user already exists
  const userFound = await User.findOne({ email });
  if (userFound) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  // ? hash the password
  // ? salt is a string for encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ? create a new User
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    success: true,
    message: "User Registered",
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "missing fields",
    });
  }

  // ? check if User exists
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ? check if the password is correct
  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Incorrect Credentials",
    });
  }

  // ? generate tokens
  const token = jwt.sign({ id: userFound._id , name: userFound.username}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({
    success: true,
    message: "User LoggedIn",
    token,
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
  });
});
