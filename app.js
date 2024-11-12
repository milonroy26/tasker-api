const express = require('express');
const app = express();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Tasker Route
const taskerRouter = require('./routes/tasker.route');
app.use('/task', taskerRouter);

// district route
const districtRouter = require('./routes/district.routes');
app.use('/district', districtRouter);

module.exports = app