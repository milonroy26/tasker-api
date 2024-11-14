const express = require('express');
const router = express.Router();
// Model
const Category = require('../models/Category.model');
// Validator
const CategoryValidator = require('../validation/category.validator');


// ➡️Get All Categories
router.get('/categories', async(req, res) => {
    try{
        const categories = await Category.find().sort('rank');
        return res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories
        })
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
})


// ➡️Create Category
router.post('/create', async(req, res) => {
    //validate request body
    const {error} = CategoryValidator.create(req.body);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // check if category exists
    let category_exist;
    try{
        category_exist = await Category.findOne({name: req.body.name});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(category_exist) return res.status(400).json({error: 'Category already exists'});

    // create category
    const createCategory = new Category({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        rank: req.body.rank
    })
    // Save category
    try{
        const saveCategory = await createCategory.save();
        return res.status(201).json({
            message: 'Category created successfully',
            category: saveCategory
        })
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
})

module.exports = router