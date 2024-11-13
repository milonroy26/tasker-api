const router = require('express').Router();
const Product = require('../models/Product.model');


// slug product
router.get('/view/:slug', async (req, res) => {
    try{
        const product = await Product.findOne({slug: req.params.slug, active: true});

        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        return res.status(200).json(product);
    }
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
})


router.get('/filter/category/:id', async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id) == false) return res.status(400).json({error: 'Invalid Category ID'});

    try{
        const products = await Product.find({
            active: true,
            category_id: req.params.id,
        },
        '_id name image slug in_stock price sale_price quantity_kg description_short'
    ).sort('rank');
    const total = await Product.countDocuments({
        active: true,
        category_id: req.params.id,
    })

    return res.status(200).json({
        data: products,
        total: total
    });
}
    catch(error){
        return res.status(500).json({error: "500 Internal Server Error"});
    }
})

router.get('/products', (req, res) => {
    res.send('product')
})


module.exports = router;