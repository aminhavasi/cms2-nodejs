const access = require('./../config/access');
const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(
        access.uri,
        {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success');
            }
        }
    );
};
module.exports = db;
