// routes/Auth.js
const express = require('express');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt'); // For hashing passwords

const router = express.Router();


router.get('/user', (req, res) => {
   
    if (req.session && req.session.user) {
        res.status(200).json({
            username: req.session.user.username,
            email: req.session.user.email
        });
    } else {
        res.status(401).json({ error: 'User not authenticated. Please log in.' });
    }
  });
// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Make sure username is included in the request body

  try {
    const user = await User.findOne({ where: { username } }) 
    
    if (user && bcrypt.compareSync(password, user.password)) {
      // Store user data in session
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      return res.json({ message: 'Login successful', user });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});
router.post('/logout', (req, res) => {
    console.log("Server: Logout request received");

   
    if (req.session) {
        
        req.session.destroy((err) => {
            if (err) {
                console.error("Error while destroying session:", err);
               
                res.status(500).json({ message: 'Error logging out. Please try again.' });
            } else {
                console.log("Server: User session destroyed");

                // Clear the cookie if it exists
                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } else {
        console.warn("Server: No active session found");

        
        res.status(200).json({ message: 'User already logged out or not authenticated' });
    }
});
module.exports = router;
