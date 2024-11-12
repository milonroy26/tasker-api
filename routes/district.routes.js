const District = require('../models/District.model');

const router = require('express').Router();


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

module.exports = router