const mongoose = require('mongoose');
const qt = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true },
    orders: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
});

const Qt = mongoose.model('Qt', qt);

module.exports = Qt;
