const express = require('express');
const validationMiddleware = require('../middleware/jwtvalidation');

const { Cocktail, Validatecocktail} = require('../models/cocktails');

const router = express.Router();




router.post('/', async (req, res) => {

 
   let result = ValidateCocktail(req.body)

   if (result.error) {
     res.status(400).json(result.error);
     return;
   }
 

    let cocktail = new Cocktail (req.body);
    
    try {
        cocktail = await cocktail.save();
        res
        .location(`${cocktail._id}`)
        .status(201)
        .json(cocktail)
    }
    catch (error){
        res.status(500).send('db_error ' + error)
    }

});


router.get('/', async (req, res) => {

  const { drinkName } = req.query;

  let filter = {}

  if (drinkName) {
    filter.drinkName = { $regex: `${drinkName}`, $options: 'i' };
  }

  

  console.table(filter);

  const cocktails = await Cocktail.
    find(filter)

  res.json(cocktails);

})


router.get('/:id', async (req, res) => {

    
    console.log('in get :id');

    try {
  
      const cocktail = await Cocktail.findById(req.params.id);
      if (cocktail) {
        res.json(cocktail);
      }
      else {
        res.status(404).json('Not found');
    }}
    catch (error) {
      res.status(404).json('Not found: id is weird ' + error);
    }
  
  })



  router.delete('/:id', async (req, res) => {
    try {
      const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
      if (cocktail)
        res.status(204).send();
      else
        res.status(404).json(`cocktail with that ID ${req.params.id} was not found`)
    }
    catch {
      res.status(404).json(`funny id ${req.params.id} was not found`);
    }
  
  })

  router.put('/:id', async (req, res) => {

    let result = ValidateCocktail(req.body)
  
    if (result.error) {
      res.status(400).json(result.error);
      return;
    }
    
    try {
  
      const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (cocktail) {
        res.json(cocktail);
      }
      else {
        res.status(404).json('Not found');
      }
    }
    catch (error) {
      res.status(404).json('Not found: id is weird' + error);
    }
  
  })
  
module.exports = router