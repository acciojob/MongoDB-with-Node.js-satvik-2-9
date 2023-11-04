const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./userModel.js');

function startServer(port) {
  const app = express();
  app.use(bodyParser.json());

  app.post('/resetpassword/:userId', async (req, res) => {
    const userId = req.params.userId;
    const newPassword = req.body.password;
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }

      user.password = newPassword; // Ideally, you should hash the password before saving.
      await user.save();
      res.status(200).send('Password updated');
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });

  const server = app.listen(port, () => console.log(`Server running on port ${port}`));

  return { app, server };
}

if (require.main === module) {
  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

  // If this file is run directly, start the server on port 3000
  startServer(3000);
}

module.exports = startServer;
