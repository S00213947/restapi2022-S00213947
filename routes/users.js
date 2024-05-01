
const express = require('express');
const { User } = require('../models/users');
const router = express.Router();

// POST to /users to register a new user
router.post('/', async (req, res) => {
    console.table(req.body);
    try {
        let user = await User.register(
            new User({
                email: req.body.email,
                username: req.body.username,
                roles: req.body.roles
            }),
            req.body.password
        );
        res.location(user._id).status(201).json(user._id);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// POST /users/favorites to add a cocktail to the user's favorites
router.post('/favorites', async (req, res) => {
  const { userId, cocktailId } = req.body;
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }
      if (!user.favorites.includes(cocktailId)) {
          user.favorites.push(cocktailId);
          await user.save();
          res.status(201).send({ message: 'Cocktail added to favorites' });
      } else {
          res.status(409).send({ message: 'Cocktail already in favorites' });
      }
  } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;