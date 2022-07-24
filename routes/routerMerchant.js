const express = require('express');
const router = express.Router();
const Middleware = require('../middlewares/middleware');
const ModelMerchant = require('../models/modelMerchant');
const ControllerMerchant = require('../controllers/controllerMerchant')

router.post ('/', Middleware.checkAuth, ControllerMerchant.registerMerchant)

router.post ('/login', ControllerMerchant.login)

router.get ('/', Middleware.checkAuth, ModelMerchant.getMerchant)

router.get('/:name', Middleware.checkAuth, ModelMerchant.getMerchantByName)

router.post('/', Middleware.checkAuth, ModelMerchant.registerMerchant)

router.put('/:id', Middleware.checkAuth, ModelMerchant.updateMerchant)

router.delete('/:id', Middleware.checkAuth, ModelMerchant.deleteMerchant)

module.exports = router