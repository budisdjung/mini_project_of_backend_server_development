require('dotenv').config();
const jwt = require('jsonwebtoken');
const Product = require('../models/modelProduct');

class ControllerProduct {
    static createProduct (req, res, next) {
        const body = req.body
        if (!body.name) {
            res.status(400).json({ message: 'Invalid name' })
        }
        Product.createProduct(body)
        res.status(201).json({ message: 'Success create new product data!' })
    }

    static deleteProduct (req, res, next) {
        const body = req.body
            if (err) {
                console.log(err)
            }
        Product.deleteProduct(body)
        res.status(200).json({ message: 'Success delete product data!' })
    }

    static updateProduct (req, res, next) {
        const body = req.body
            if (err) {
                console.log(err)
            }
        Product.updateProduct(body)
        res.status(200).json({ message: 'Success update product data!' })
    }

    static getProduct (req, res, next) {
        const body = req.body
        Product.getProduct(body)
    }
}

module.exports = ControllerProduct