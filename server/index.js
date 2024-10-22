const express = require('express');

const cors = require('cors');
const authRoutes = require('./routes/Auth'); // Ensure this path is correct
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials such as cookies
}));
app.use(session({
  secret: 'your-secret-key', // replace with your actual secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevents JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS
    sameSite: 'none', // Necessary for cross-site cookie usage; 'lax' might also work depending on your use case
  },
}));


app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  app.get('/dashboard', (req, res) => {
    res.send('Server is running!');
  });
  app.get('/houseprice', (req, res) => {
    res.send('Server is running!');
  });
  app.get('/ci', (req, res) => {
    res.send('Server is running!');
  });

// Use authentication routes
app.use('/auth', authRoutes); // This mounts the auth routes
// app.get('/auth/user', (req, res) => {
//   if (req.session.user) {
//     res.status(200).json({ user: req.session.user });
//   } else {
//     res.status(401).json({ message: 'User not authenticated' });
//   }
// });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
