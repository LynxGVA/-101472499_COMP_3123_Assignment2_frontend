const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

async function createSampleUser() {
  try {
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (!existingUser) {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      console.log('Sample user created');
    } else {
      console.log('Sample user already exists');
    }
  } catch (err) {
    console.log('Error creating sample user:', err);
  }
}

module.exports = { User, createSampleUser };
