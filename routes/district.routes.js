const router = require('express').Router();

const District = require('../models/District.model');
const DistrictValidator = require('../validation/district.validator');
const { default: mongoose } = require('mongoose');

// get all districts
router.get('/districts', async (req, res) => {
   try{
    const districts = await District.find({active: true}, '_id name').sort('name');
    return res.status(200).json(districts);
   }
   catch(error){
    return res.status(500).json({error: "500 Internal Server Error"});
   }
})

// create a district
router.post('/create', async (req, res) => {

    const {error} = DistrictValidator.create(req.body);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    let district;
    try{
        district = await District.findOne({
            name: req.body.name
        })
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }

    if(district){
        return res.status(400).json({error: "District already exists"});
    }

    const createDistrict = new District({
        name: req.body.name,
    })

    try{
        const seveDistrict = await createDistrict.save();
        return res.status(201).json({
            message: "District created successfully",
            data: seveDistrict
        })
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
})

// delete a district
router.delete('/delete/:id', async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id) == false) return res.status(400).json({error: 'Invalid ID'});
    let district;
    try{
        district = await District.findOne({_id: req.params.id});
    }catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }

    if(!district) return res.status(404).json({error: 'District not found'});

    try{
        const deleteDistrict = await District.deleteOne({_id: district._id});
        return res.status(200).json({message: 'District has deleted', success: deleteDistrict});
    }catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
});

//update a district
router.put('/update/:id', async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id) == false) return res.status(400).json({error: 'Invalid ID'});

    const {error} = DistrictValidator.create(req.body);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    let district;
    try{
        district = await District.findOne({_id: req.params.id});
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }

    if(!district) return res.status(404).json({error: 'District not found'});

    try{
        const updateDistrict = await District.updateOne({_id: district._id}, req.body);

        return res.status(200).json({
            message: "District updated successfully",
            data: updateDistrict
        })
    }
    catch(error){
        return res.status(500).json({error: '500 Internal Server Error'});
    }
})

module.exports = router