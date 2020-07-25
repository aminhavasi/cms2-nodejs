const Joi = require('joi');

const registerValidator = (user) => {
    const shcema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
    });

    return shcema.validate(user);
};

module.exports = {
    registerValidator,
};
