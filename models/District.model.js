const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    name: {
        type: String,
        required: true
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
});

const districtModel = mongoose.model('district', districtSchema);
module.exports = districtModel;