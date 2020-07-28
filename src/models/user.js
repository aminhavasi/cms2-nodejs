const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./../config/access');
const bcrypt = require('bcryptjs');
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
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
        },
    },

    { toJSON: { virtuals: true } }
);

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

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

userSchema.statics.findByCredintials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject('not');
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject('not');
                }
            });
        });
    });
};

userSchema.virtual('user', {
    ref: 'Recovery',
    localField: '_id',
    foreignField: 'user',
});

userSchema.virtual('user', {
    ref: 'Admin',
    localField: '_id',
    foreignField: 'user',
});
const User = mongoose.model('User', userSchema);

module.exports = User;
