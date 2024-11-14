const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// model
const Product = require('../models/Product.model');
const SubCategory = require('../models/Subcategory.model');
const Category = require('../models/Category.model');
// validation
const ProductValidator = require('../validation/product.validator');

router.get('/', (req, res) => {
    res.send('Product Admin Route');
})

router.post('/create', async(req, res) => {

    // validate request body 
    const {error} = ProductValidator.create(req.body);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    // check if subcategory id is valid
    if(mongoose.Types.ObjectId.isValid(req.body.subcategory_id) == false) return res.status(400).json({error: 'Invalid ID'});

    // Slug exists or not 
    let slug;
    try{
        slug = await Product.findOne({slug: req.body.slug});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(slug) return res.status(400).json({error: 'Slug already exists'});

    // subCategory exists or not
    let subcategory;
    try{
        subcategory = await SubCategory.findOne({_id: req.body.subcategory_id});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(!subcategory){
        return res.status(404).json({error: 'Subcategory not found'});
    };

    // category exists or not
    let category;
    try{
        category = await Category.findOne({_id: subCategory.category_id});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(!category){
        return res.status(404).json({error: 'Category not found'});
    }

    // create product
    const createProduct = new Product({
        name: req.body.name,
        image: "https://res.cloudinary.com/bdassistant/image/upload/w_1600/v1668603363/banners/web_cover_final-01_eench2.jpg",
        image_id: "33333",
        category_name: category.name,
        category_id: category._id,
        subcategory_name: subcategory.name,
        subcategory_id: subcategory._id,
        price: req.body.price,
        sale_price: req.body.sale_price,
        packaging_type: req.body.packaging_type,
        quantity_kg: req.body.quantity_kg,
        description_short: req.body.description_short,
        description: req.body.description,
        rank: req.body.rank,
        slug: req.body.slug
    })

    try{
        const saveProduct = await createProduct.save();
        return res.status(201).json({
            message: "Product created successfully",
            data: saveProduct
        })
    }
    catch(error){
        return res.status(500).json({
            error: "500 Internal Server Error"
        })
    }

})

module.exports = router