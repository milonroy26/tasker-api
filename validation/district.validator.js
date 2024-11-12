const Joi = require('joi');


const create = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        active: Joi.boolean(),
    })

    return schema.validate(data)
}

module.exports = { create }






 
 
 
 
 
 
 
 
 
 

 