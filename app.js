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

// product route
// const productRouter = require('./routes/product.routes');
// app.use('/product', productRouter);

// category route
const categoryRouter = require('./routes/admin_category.routes');
app.use('/admin/category', categoryRouter);

// subcategory route
const subcategoryRouter = require('./routes/admin_subcategory.route');
app.use('/admin/subcategory', subcategoryRouter);


// product admin route
const productAdminRouter = require('./routes/admin_product.route');
app.use('/admin/product', productAdminRouter);

module.exports = app