const express = require('express');
const User = require('../models/user');
const router = express.Router();
const persianDate = require('persian-date');

const {
    registerValidator,
    loginValidator,
} = require('./../validator/authValidator');
const { findOne } = require('../models/user');

persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD');
router.post('/register', async (req, res) => {
    try {
        const { error } = await registerValidator(req.user);
        if (error) return res.status(400).send('data sent is not currect');
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('this email Already exict!');
        req.body.date = date;
        const newUser = await new User(req.body);
        await newUser.save();
        const token = await newUser.genAuthToken();
        res.status(200).header('x-auth', token).send();
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error } = await loginValidator(req.body);
        if (error) return res.status(400).send('data sent is not correct');
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).send('Your email or password is incorrect');
        const token = await user.genAuthToken();
        res.status(200).header('x-auth', token).send();
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

router.post('/logout', async (req, res) => {
    try {
        await User.updateOne(
            {
                _id: req.headers.userid,
            },
            {
                $pull: {
                    tokens: {
                        token: req.headers.usertoken,
                    },
                },
            },
            { multi: true },
            (err, doc) => {
                if (doc.nModified === 1)
                    return res.status(200).send('logout success');
                else {
                    return res.status(400).send('logout falied');
                }
            }
        );
    } catch (err) {
        res.status(400).send('failed');
    }
});

module.exports = router;

//
