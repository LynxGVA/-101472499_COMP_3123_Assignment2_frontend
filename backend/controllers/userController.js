const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, message: errors.array()[0].msg });
  }

  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "Signup successful"
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "mysecretkey", { expiresIn: "1h" });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token: token
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};