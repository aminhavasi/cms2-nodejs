const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    token: {
        type: String,
        required: true,
    },
    expireAt: { type: Date, expires: 3600, default: Date.now },
});

const Recovery = mongoose.model('Recovery', tokenSchema);

module.exports = Recovery;
