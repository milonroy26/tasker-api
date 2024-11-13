const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// model
const Product = require('../models/Product.model');
const SubCategory = require('../models/Subcategory.model');
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
    let subCategory;
    try{
        subCategory = await SubCategory.findOne({_id: req.body.subcategory_id});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(!subCategory){
        return res.status(404).json({error: 'Subcategory not found'});
    };

    // category exists or not
    let category;
    try{
        console.log('milon');
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }


})

module.exports = router