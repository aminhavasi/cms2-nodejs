const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: Number,
        required: true,
    },
    properties: [
        {
            _id: false,
            property: {
                type: String,
                trim: true,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    Warranty: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    material: {
        type: String,
        trim: true,
    },
    producer: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: String,
    },
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
