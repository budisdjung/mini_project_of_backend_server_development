const express = require('express')
const router = express.Router()
const db = require('../config/db')
const ControllerMerchant = require('../controllers/controllerMerchant')
const Middleware = require('../middlewares/middleware')


router.post('/', Middleware.checkAuth, ControllerMerchant.createMerchant)

router.post('/login', ControllerMerchant.login)

router.get('/', Middleware.checkAuth, function (req, res, next) {
    const query = 'SELECT * FROM merchant'
    db.all(query, (err, row) => {
        res.status(200).json(row)
    })
  })

  router.put('/:id', Middleware.checkAuth,  function (req, res, next) {
    const query = 'UPDATE merchant SET name = ? WHERE id =?'
    const merchantId = req.params.id
    const body = req.body
    db.run(query, [body.name, merchantId], function(err) {
      if (err) {
          console.log(err)
      }
  })
      res.status(200).json({ message: "Success update new data!"})
  })

  router.delete('/:id', function (req, res, next) {
    const query = 'DELETE from merchant WHERE id = ?'
    const merchantId = req.params.id
 
    db.run(query, [merchantId], function(err) {
      if (err) {
          console.log(err)
      }
  })
      res.status(200).json({ message: "Success delete new data!"})
  })

module.exports = router