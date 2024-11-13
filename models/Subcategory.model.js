const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: 1
    },
    active: {
        type: Boolean,
        default: true
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

const subCategoryModel = mongoose.model('subcategory', subcategorySchema);

module.exports = subCategoryModel;