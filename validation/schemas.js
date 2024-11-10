const Joi = require('joi');

exports.schemas = {
    taskSchema: Joi.object({
        title: Joi.string().required().min(3).max(20),
        description: Joi.string().required().min(3).max(300),
        priority: Joi.string().required().min(3).max(10),
        isCompleted: Joi.boolean(),
    })
}