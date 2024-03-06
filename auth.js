// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../user');

router.post('/signup', async (req, res) => {
  try {
    const { googleId, email, role } = req.body;
    const newUser = new User({ googleId, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

// routes/auth.js

router.post('/login', async (req, res) => {
    try {
      const { email, otp } = req.body;
      // Retrieve user from database using email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check if OTP matches
      if (otp !== user.otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
      }
      // Clear OTP and allow login
      user.otp = '';
      await user.save();
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
