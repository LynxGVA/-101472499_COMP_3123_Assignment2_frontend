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
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully.',
      user_id: newUser._id
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid Username and password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: 'Invalid Username and password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      'mysecretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      jwt_token: token
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
