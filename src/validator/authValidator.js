const Joi = require('joi');

const registerValidator = (user) => {
    const shcema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
    });

    return shcema.validate(user);
};

const loginValidator = (user) => {
    const shcema = Joi.object({
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
    });

    return shcema.validate(user);
};

const recoveryValidator = (email) => {
    const shcema = Joi.object({
        email: Joi.string().email().min(3).max(255).required(),
    });

    return shcema.validate(email);
};

const RecoveryPasswordValidator = (password) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(1024),
    });
    return schema.validate(password);
};

module.exports = {
    registerValidator,
    loginValidator,
    recoveryValidator,
    RecoveryPasswordValidator,
};
