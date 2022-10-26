const { default: mongoose } = require("mongoose");

const Joi = require('joi');




const cocktailSchema = new mongoose.Schema({
    drinkName: String,
    alcholic: String,
    instructions: String,
    year: Number,
    ing1: String,
    ing2: String,
    ing3: String,
    ing4: String,
    measure1: String,
    measure2: String,
    measure3: String,
    measure4: String,
    


})

function Validatecocktail(cocktail) {

   
     const cocktailJoiSchema = Joi.object({
        drinkName: Joi.string()
        .min(2)
        .required()
        .messages({'string.empty': "you foool you left title blank",
                   'any.required': "you fool you forgot the title field"}),
        
        ing1: Joi.string(),
        measure1: Joi.string()
     })
     return cocktailJoiSchema.validate(cocktail);
 }



const Cocktail = mongoose.model('cocktail', cocktailSchema)

module.exports = {Cocktail, Validatecocktail}