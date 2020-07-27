const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    price: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        default: 'employee',
    },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
