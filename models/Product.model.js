const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    image_id: {
        type: String,
        required: false
    },
    category_name: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    subcategory_name: {
        type: String,
        required: true
    },
    subCategory_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sale_price: {
        type: Number,
        default: 0
    },
    packaging_type: {
        type: String,
        required: true
    },
    quantity_kg: {
        type: Number,
        required: true
    },
    description_short: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true
    },
    in_stock: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },
    updated: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;