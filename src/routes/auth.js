const express = require('express');
const User = require('../models/user');
const router = express.Router();
const persianDate = require('persian-date');

const { registerValidator } = require('./../validator/authValidator');

persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD');
router.post('/register', async (req, res) => {
    try {
        const { error } = await registerValidator(req.user);
        if (error) return res.status(400).send('data sent is not currect');
        const user = await User.findOne({ email: req.body.emai });
        if (user) return res.status(400).send('this email Already exict!');
        req.body.date = date;
        const newUser = await new User(req.body);
        await newUser.save();
        newUser.genAuthToken();
    } catch (err) {}
});

module.exports = router;
