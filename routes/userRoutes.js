const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/userController');

const signupValidation = [
  body('username').notEmpty().withMessage('Username required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

router.post('/signup', signupValidation, signupUser);
router.post('/login', loginUser);

module.exports = router;