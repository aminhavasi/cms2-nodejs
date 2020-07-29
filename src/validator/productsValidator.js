const Joi = require('joi');

const createValidator = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        number: Joi.number().required(),
        properties: Joi.array().items(
            Joi.object({
                property: Joi.string(),
            })
        ),

        price: Joi.number().min(0).required(),
        Warranty: Joi.boolean(),
        image: Joi.string(),
        material: Joi.string(),
        producer: Joi.string(),
        content: Joi.string(),
    });

    return schema.validate(product);
};
module.exports = {
    createValidator,
};
