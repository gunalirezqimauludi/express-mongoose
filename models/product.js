const mongoose = require('mongoose');

// Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    status: Boolean,
});

// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;