require('dotenv').config();
const jwt = require('jsonwebtoken')
const modelMerchant = require('../models/modelMerchant')

class ControllerMerchant {
    static registerMerchant (req, res, next) {
        const body = req.body
        if (!body.name) {
            res.status(400).json({ message: 'Invalid name'})
        }
        merchant.registerMerchant(body, row => {
            console.log(row)
        })
        res.status(201).json({ message: "Success create new data!"})
    }

    static async login (req, res, next) {
        const body = req.body
        const merchant = await modelMerchant.findMerchantByNameAndPassword(body.name, body.password)
        if (merchant && merchant.length != 0) {
            const token = jwt.sign({ merchant }, 'shhhhh');
            res.status(200).json({ token })
        }
        else {
            res.status(401).json({ message: 'Unauthorized'})
        }
    }

    static async loginPromise (req, res, next) {
        // generate jwt token
        const body = req.body // name, password
        findUserByNameAndPassword(body.name, body.password)
            .then(user => {
            // for password BYCRPT --> npm install bycrpt
                 if (user && user.length != 0) {
                    // user found
                    const token = jwt.sign({  // jwt.sign to convert variable user into token
                            user
                    }, 'shhhhh'); // secret better stored in .env
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