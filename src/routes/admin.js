const express = require('express');
const router = express.Router();
const authenticate = require('./../middleware/authenticate');
const adminLevel = require('../middleware/adminLevel');
const Admin = require('../models/admins');
const User = require('../models/user');

router.post('/createadmin', authenticate, adminLevel, async (req, res) => {
    if (req.user._id === req.body.id)
        return res
            .status(401)
            .send('Access denied.No access to change youreself!');
    try {
        const newAdmin = new Admin({
            user: req.body.id,
            price: req.body.price,
            position: req.body.position,
        });

        newAdmin.save().then(() => {
            User.findById(req.body.id).then((user) => {
                user.admin = newAdmin._id;
                user.save();
            });

            res.send('ok');
        });
    } catch (error) {
        res.status(400).send('something went wrong!');
    }
});

module.exports = router;
