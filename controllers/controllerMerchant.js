require('dotenv').config();
const jwt = require('jsonwebtoken')
const Merchant = require('../models/modelMerchant')

class ControllerMerchant {
    static registerMerchant (req, res, next) {
        const body = req.body
        if (!body.name) {
            res.status(400).json({ message: 'Invalid name'})
        }
        Merchant.registerMerchant(body)
        res.status(201).json({ message: "Success create new merchant data!"})
    }

    static async login (req, res, next) {
        const body = req.body
        const merchant = await Merchant.findMerchantByNameAndPassword(body.name, body.password)
        if (merchant && merchant.length != 0) {
            const token = jwt.sign({ merchant }, process.env.SECRET);
            res.status(200).json({ token })
        }
        else {
            res.status(401).json({ message: 'Unauthorized'})
        }
    }

    static deleteMerchant (req, res, next) {
        const body = req.body
        if (err) {
            console.log(err)
        }
        Merchant.deleteMerchant(body)
        res.status(200).json({ message: 'Success delete merchant data' })
    }
}



module.exports = ControllerMerchant