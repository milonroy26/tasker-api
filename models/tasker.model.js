const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const taskerSchema = new Schema({
    title: String,
    description: String,
    priority: String,
    isCompleted: Boolean,
})

// create a model
const taskerModel = mongoose.model('Tasker', taskerSchema);

module.exports = {taskerModel};