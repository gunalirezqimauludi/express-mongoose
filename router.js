require('./connection');
const express = require('express');
const router = express.Router();

// Model
const Product = require('./models/product');

// Routing
router.get('/', (_, res) => {
    res.send('ExpressJS - Mongoose');
});

router.get('/products', async (_, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.json({
            status: 'success',
            message: 'product list found.',
            data: products,
        });
    } else {
        res.json({
            status: 'success',
            message: 'product list not found.',
        });
    }
});

router.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json({
            status: 'success',
            message: 'product found.',
            data: product,
        });
    } else {
        res.json({
            status: 'success',
            message: 'product not found.',
        });
    }
});

router.post('/product', async (req, res) => {
    const { name, price, stock, status } = req.body;

    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        });

        if (product) {
            res.json({
                status: 'success',
                message: 'add product successfully',
                data: product
            });
        } else {
            res.json({
                status: 'warning',
                message: 'add product failed'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        });
    }
});

router.put('/product/:id', async (req, res) => {
    const { name, price, stock, status } = req.body;

    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                name: name,
                price: price,
                stock: stock,
                status: status
            },
            { runValidators: true }
        );

        if (result.ok) {
            res.json({
                status: 'success',
                message: 'update product successfully',
                data: result
            });
        } else {
            res.json({
                status: 'warning',
                message: 'update product failed',
                data: result
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        });
    }
});

router.delete('/product/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne(
            { _id: req.params.id }
        );

        if (result.ok) {
            res.json({
                status: 'success',
                message: 'delete product successfully',
                data: result
            });
        } else {
            res.json({
                status: 'warning',
                message: 'delete product failed',
                data: result
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        });
    }
});

module.exports = router;