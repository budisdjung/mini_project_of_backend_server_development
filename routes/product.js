const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { checkAuth } = require('../middlewares/middleware');
const middleware = require('../middlewares/middleware');
const ModelProduct = require('../models/modelProduct');

router.get ('/', middleware, checkAuth, ModelProduct.getAllProduct)

router.post('/', middleware, checkAuth, ModelProduct.createProduct)

router.put('/:id/quantity', middleware, checkAuth, ModelProduct.updateQuantity)

router.put('/:id/price', middleware, checkAuth, ModelProduct.updatePrice)

router.delete('/:id', middleware, checkAuth, ModelProduct.deleteProduct)