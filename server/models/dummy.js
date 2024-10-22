const User = require('./User'); // Adjust the path as necessary

User.create({
  username: 'exampleUser',
  email: 'example@example.com',
  password: 'password123',
})
  .then(() => console.log('User created successfully'))
  .catch(err => console.error('Error creating user:', err));