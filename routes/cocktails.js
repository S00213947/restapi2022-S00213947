const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middleware/jwtvalidation');

const { Cocktail, ValidateCocktail} = require('../models/cocktails');
const { Favorite } = require('../models/favorites');



router.post('/', async (req, res) => {
  const { error } = ValidateCocktail(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  let cocktail = new Cocktail(req.body);
  try {
      await cocktail.save();
      res.location(`${cocktail._id}`).status(201).json(cocktail);
  } catch (error) {
      res.status(500).json({error: 'Database error', message: error.message});
  }
});


router.get('/', async (req, res) => {

  const { strDrink } = req.query;
  let filter = {}

  if (strDrink) {
    filter.strDrink = { $regex: `${strDrink}`, $options: 'i' };
  }
  console.table(filter);
  const cocktails = await Cocktail.
    find(filter)

  res.json(cocktails);

})


router.get('/cocktails/:id', async (req, res) => {
  try {
      const cocktail = await Cocktail.findOne({ idDrink: req.params.id });
      if (!cocktail) {
          return res.status(404).send('Cocktail not found');
      }
      res.json(cocktail);
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).send('Internal Server Error');
  }
});



router.delete('/favorites/:id', async (req, res) => {
  try {
    const cocktail = await Favorite.findOneAndDelete({ idDrink: req.params.id });
    if (cocktail) {
      res.status(200).json(cocktail).end();
    } else {
    return   res.status(404).send(`Cocktail with ID ${req.params.id} was not found`);
    }
  } catch (error) {
    console.error('Error deleting cocktail:', error);
   return res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = ValidateCocktail(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  try {
    const cocktail = await Cocktail.findOneAndUpdate({ idDrink: req.params.id }, req.body, { new: true });
    if (cocktail) {
      res.json(cocktail);
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error('Error updating cocktail:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/favorites', async (req, res) => {
  
const favoriteData = req.body;
const favorite = new Favorite(favoriteData);
try {
  const cocktail = await Favorite.findOne({ idDrink: req.body.idDrink });
  if (cocktail) {
      return res.status(404).send('Cocktail already registered found'); 
  }
  else{
    await favorite.save();
    res.status(201).send(favorite);
  }
} catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).send('Internal Server Error');
}
});

router.get('/favorites', async (req, res) => {
  try {
      const favorites = await Favorite.find(); // Fetches all entries in the Cocktail collection
      res.json(favorites);
  } catch (error) {
      console.error('Error retrieving favorites:', error);
      res.status(500).send('Internal Server Error');
  }
});


module.exports = router