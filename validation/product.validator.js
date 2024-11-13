const Joi = require('joi');


const create = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        subcategory_id: Joi.string().required(),
        price: Joi.number().required(),
        sale_price: Joi.number().allow(0),
        packaging_type: Joi.string().required(),
        quantity_kg: Joi.number().required(),
        description_short: Joi.string().required(),
        description: Joi.string().allow(''),
        rank: Joi.number().required(),
        slug: Joi.string().required()
    })
    return schema.validate(data)
}

const update = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        subcategory_id: Joi.string().required(),
        price: Joi.number().required(),
        sale_price: Joi.number().allow(0),
        packaging_type: Joi.string().required(),
        quantity_kg: Joi.number().required(),
        description_short: Joi.string().required(),
        description: Joi.string().allow(''),
        rank: Joi.number().required(),
        slug: Joi.string().required(),
        active: Joi.boolean().required(),
        in_stock: Joi.boolean().required()
    })

    return schema.validate(data)
}

const filter = (data) => {
    const schema = Joi.object({
        skip: Joi.number().allow(0),
        limit: Joi.number().required().min(1),
        category_id: Joi.string().allow(''),
        name: Joi.string().allow(''),
    })

    return schema.validate(data)
}

module.exports.filter = filter;
module.exports.create = create;
module.exports.update = update;