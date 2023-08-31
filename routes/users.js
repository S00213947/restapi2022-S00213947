
const express = require('express');
const { User } = require('../models/users')

const router = express.Router();

// post to /users with name username and password to login

router.post('/', async (req, res) => {
    console.table(req.body);

    try {
      let user = await User.register(
        new User({
          email: req.body.email,
          username: req.body.username,
          roles: req.body.roles
        }),
        req.body.password);
  
      res.location(user._id).
        status(201).
        json(user._id);
    }
    catch (error) {
      res.status(400).json({ error: error });
      return;
    }
  });

  // POST /users/favorites
router.post('/profile', async (req, res) => {
  const { userId, cocktailId } = req.body;

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      user.favorites.push(cocktailId);

      await user.save();

      res.send({ message: 'Cocktail added to favorites' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
  }
});
  
  module.exports = router;