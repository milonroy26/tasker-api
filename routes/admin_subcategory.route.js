const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// model
const SubCategory = require('../models/Subcategory.model');
const Category = require('../models/Category.model');
// validation
const CategoryValidator = require('../validation/category.validator');

// ⭕Get All SubCategories
router.get('/subcategories', async(req, res) => {
    try{
        const subcategories = await SubCategory.find().sort('rank');
        return res.status(200).json({
            message: 'SubCategories fetched successfully',
            data: subcategories
        })
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
})

// ⭕Create SubCategory
router.post('/subcategory', async(req, res) => {
    const {error} = CategoryValidator.createSubCategory(req.body);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // check if category id is valid
    if(mongoose.Types.ObjectId.isValid(req.body.category_id) === false){
        return res.status(400).json({
            error: 'Invalid Category ID'
        })
    }

    // check if category exists
    let category;
    try{
       category = await Category.findOne({_id: req.body.category_id});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
    if(!category){
        return res.status(400).json({
            error: 'Category not found'
        })
    }

    const createSubCategory = new SubCategory({
        name: req.body.name,
        category_id: req.body.category_id,
        category_name: category.name,
        rank: req.body.rank
    })

    try{
        const saveSubCategory = await createSubCategory.save();
        return res.status(201).json({
            message: 'SubCategory created successfully',
            data: saveSubCategory
        })
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }

})

module.exports = router;