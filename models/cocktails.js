const { default: mongoose } = require("mongoose");

const Joi = require('joi');




const cocktailSchema = new mongoose.Schema({
    drinkName: String,
    alcholic: String,
    instructions: String,
    ing1: String,
    ing2: String,
    ing3: String,
    ing4: String,
    measure1: String,
    measure2: String,
    measure3: String,
    measure4: String,
    


})

function ValidateCocktail(cocktail) {

   
     const cocktailJoiSchema = Joi.object({
        drinkName: Joi.string()
        .min(2)
        .required()
        .messages({'string.empty': "you foool you left title blank",
                   'any.required': "you fool you forgot the title field"}),
        
        ing1: Joi.string(),
        ing2: Joi.string(),
        ing3: Joi.string(),
        measure1: Joi.string(),
        measure2: Joi.string(),
        measure3: Joi.string(),
        instructions: Joi.string()
     })
     return cocktailJoiSchema.validate(cocktail);
 }



const Cocktail = mongoose.model('cocktail', cocktailSchema)

module.exports = {Cocktail, ValidateCocktail}