const jwt = require('jsonwebtoken');
const access = require('../config/access');
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied.No token provided.');
    try {
        const jwtVerify = jwt.verify(token, access.jwt_key);

        req.user = jwtVerify;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
