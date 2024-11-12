const router = require('express').Router();

router.get('/products', (req, res) => {
    res.send('product')
})


module.exports = router;