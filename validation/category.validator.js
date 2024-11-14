const Joi = require('joi');

const create = (data) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        rank: Joi.number().required(),
        image: Joi.string().required()
    })
    return Schema.validate(data)
}


const createSubCategory = (data) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        category_id: Joi.string().required(),
        rank: Joi.number().required(),
    })

    return Schema.validate(data)
}

module.exports = {
    create,
    createSubCategory
}