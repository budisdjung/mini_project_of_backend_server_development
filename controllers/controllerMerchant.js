require('dotenv').config();
const Merchant = require('../models/modelMerchant')
const jwt = require('jsonwebtoken')
const { findMerchantByPasswordAndName } = require('../models/modelMerchant')

class ControllerMerchant {
    // CALLBACK
    static createMerchant (req, res, next) {
        const body = req.body
        if (!body.name) {
            res.status(400).json({ message: 'Invalid name'})
        }
        Merchant.createMerchant(body, row => {
            console.log(row)
        })
        res.status(201).json({ message: "Success create new data!"})
    }

    // ASYNC AWAIT
    static async login (req, res, next) {
        // generate jwt token
        const body = req.body // name, password
        const merchant = await Merchant.findMerchantByPasswordAndName(body.password, body.name)
        // for password BYCRPT --> npm install bycrpt
        if (merchant && merchant.length != 0) {
            // user found
            const token = jwt.sign({  // jwt.sign to convert variable user into token
                merchant
            }, process.env.SECRET); // secret better stored in .env
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: 'Unauthorized'})
        }
    }

    // PROMISE
    static async loginPromise (req, res, next) {
        // generate jwt token
        const body = req.body // name, password
        findMerchantByPasswordAndName(body.password, body.name)
            .then(merchant => {
            // for password BYCRPT --> npm install bycrpt
                 if (merchant && merchant.length != 0) {
                    // user found
                    const token = jwt.sign({  // jwt.sign to convert variable user into token
                            user
                    }, process.env.SECRET); // secret better stored in .env
                    res.status(200).json({ token })
                } else {
                    res.status(401).json({ message: 'Unauthorized'})
                 }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerMerchant