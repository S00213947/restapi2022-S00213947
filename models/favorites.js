const { default: mongoose } = require("mongoose");

const Joi = require('joi');


const favoriteSchema = new mongoose.Schema({
    idDrink: String,
    strDrink: String,
    strInstructions: String,
    strIngredient1: String,
    strIngredient2: String,
    strIngredient3: String,
    strIngredient4: String,
    strIngredient5: String,
    strIngredient6: String,
    strIngredient7: String,
    strMeasure1: String,
    strMeasure2: String,
    strMeasure3: String,
    strMeasure4: String,
    strMeasure5: String,
    strMeasure6: String,
    strMeasure7: String,
    strDrinkThumb:String,
})

const Favorite = mongoose.model('favorite', favoriteSchema)

module.exports = {Favorite}
