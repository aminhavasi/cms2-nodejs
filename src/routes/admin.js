const express = require('express');
const router = express.Router();
const authenticate = require('./../middleware/authenticate');
const adminLevel = require('../middleware/adminLevel');
const Admin = require('../models/admins');
const User = require('../models/user');
router.get('/', authenticate, adminLevel, async (req, res) => {
    res.send('ok');
});

router.post('/', (req, res) => {
    const newAdmin = new Admin({
        user: req.body.id,
        price: 3000,
        position: 'boss',
    });

    newAdmin.save().then(() => {
        User.findById(req.body.id).then((user) => {
            user.admin = newAdmin._id;
            user.save();
        });

        res.send('ok');
    });
});

module.exports = router;
