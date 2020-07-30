const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const authenticate = require('./../middleware/authenticate');
const Qt = require('../models/qt');

router.post('/order', authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(200).send();

        if (!req.user._id === req.body.user)
            return res.status(400).send('invalid id');
        const newOrder = await new Qt(req.body);
        newOrder.save();
        res.status(200).send('ok');
    } catch (err) {
        res.status(400).send('bad request');
    }
});

module.exports = router;
