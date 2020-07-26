const jwt = require('jsonwebtoken');
const access = require('../config/access');

const genAuthTokenRecovery = (user) => {
    const token = jwt.sign(
        {
            _id: user._id,
        },
        access.jwt_key
    );

    return token;
};

module.exports = genAuthTokenRecovery;
