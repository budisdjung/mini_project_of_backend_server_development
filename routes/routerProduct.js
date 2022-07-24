const express = require('express');
const router = express.Router();
const Middleware = require('../middlewares/middleware');
const ModelProduct = require('../models/modelProduct');

router.get ('/', Middleware.checkAuth, ModelProduct.getAllProduct)

router.post('/', Middleware.checkAuth, ModelProduct.registerProduct)

router.put('/:id/quantity', Middleware.checkAuth, ModelProduct.updateQuantity)

router.put('/:id/price', Middleware.checkAuth, ModelProduct.updatePrice)

router.delete('/:id', Middleware.checkAuth, ModelProduct.deleteProduct)

module.exports = router