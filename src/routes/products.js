const express = require('express');
const persianDate = require('persian-date');
const router = express.Router();
const Products = require('../models/products');
const { createValidator } = require('./../validator/productsValidator');

persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD');
//get products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find({});

        res.status(200).send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

//create-products
router.post('/createProducts', async (req, res) => {
    try {
        const { error } = await createValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const newProduct = await new Products(req.body);
        newProduct.date = date;
        await newProduct.save();
        res.status(200).send(newProduct);
    } catch (err) {
        res.status(400).send(err);
    }
});

//remove product
router.delete('/removeProduct', async (req, res) => {
    try {
        await Products.findOneAndDelete({ _id: req.query.id });
        res.status(200).send('success delete');
    } catch (err) {
        res.status(400).send('failed delete');
    }
});

//modified product
router.post('/editProduct', async (req, res) => {
    try {
        await Products.findOneAndUpdate(
            { _id: req.query.id },
            {
                $set: req.body,
            },
            { new: true },
            (err, doc) => {
                if (!err) {
                    res.status(200).send(doc);
                }
            }
        );
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

module.exports = router;
