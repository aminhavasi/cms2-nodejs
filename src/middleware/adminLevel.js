const User = require('../models/user');
const Admin = require('../models/admins');
const acl = require('./../config/acl.json');
const isAdmin = async (req, res, next) => {
    let accessRoute = null;
    const user = await User.findOne({ _id: req.user._id })
        .populate('admin')
        .exec();
    const admin = await Admin.findOne({ user: user._id });
    if (admin.position === 'boss') {
        accessRoute = acl.boss.access.find((element) => {
            if (element === req._parsedUrl.pathname) return true;
        });
    } else if (admin.position === 'user') {
        return res
            .status(401)
            .send('Access denied.You cant access to Admin Routes');
    } else {
        return res
            .status(401)
            .send('Access denied.You cant access to Admin Routes');
    }
    if (accessRoute) next();
    next();
};

module.exports = isAdmin;
