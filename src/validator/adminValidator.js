const Joi = require('joi');
const createAdmin = (user) => {
    const shcema = Joi.object({
        id: Joi.string().min(3).max(1024).required(),
        price: Joi.number().max(2000).required(),
        position: Joi.string().min(1).max(255).required(),
    });

    return shcema.validate(user);
};

const removeAdmin = (user) => {
    const shcema = Joi.object({
        id: Joi.string().min(3).max(1024).required(),
    });

    return shcema.validate(user);
};

module.exports = {
    createAdmin,
    removeAdmin,
};
