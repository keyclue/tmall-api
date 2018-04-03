const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;