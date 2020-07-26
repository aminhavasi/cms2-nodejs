const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./../config/access');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        tokens: [
            {
                _id: false,
                access: {
                    type: String,
                    required: true,
                },
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },

    { toJSON: { virtuals: true } }
);

userSchema.methods.genAuthToken = function () {
    let user = this;
    let access = 'user';
    let token = jwt
        .sign(
            {
                _id: user._id.toHexString(),
                access,
            },
            config.jwt_key
        )
        .toString();
    user.tokens.push({ token, access });
    return user.save().then(() => {
        return token;
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
