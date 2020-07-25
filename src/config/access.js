const config = require('./config.json');
let access = {};
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    access = config.production;
} else if (process.env.NODE_ENV && process.env.NODE_ENV === 'final') {
    access = config.final;
} else {
    return null;
}

module.exports = access;
