const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true,
    },
    image_id: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    rank: {
        type: Number,
        default: 1
    },
    updated: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;