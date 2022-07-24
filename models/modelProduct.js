const db = require('../config/db')

class ModelProduct {
    static getAllProduct (req, res, next) {
        const query = 'SELECT * FROM product'
        db.all(query, (err, row) => {
            if (err) {
                console.log(err)
            }
            res.status(200).json(row)
        })
    }

    static getProductByName (req, res, next) {
        const query = 'SELECT * FROM product WHERE name = ?'
        const id = req.params.id
        db.all(query, [id], function (err, result){
            if (result.length == 0) {
                res.status(404).json({ message : 'Data not found'})
            }
            else {
                res.status(200).json(result)
            }
        })
    }

    static registerProduct (req, res, next) {
        const body = req.body;
        if (body.name == null) {
            res.status(400).json({ message: 'Name is required' })
        }
        if (body.quantity == null) {
            res.status(400).json({ message : 'Quantity is required'})
        }
        if (body.price == null) {
            res.status(400).json({ message : 'Price is required'})
        }

        const query = `INSERT INTO product (id, merchant_id, name, quantity, price, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, DATETIME('NOW', 'LOCALTIME'))`
        db.run(query, [body.id, body.merchant_id, body.name, body.quantity, body.price, body.created_by, body.created_at], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success register new product' })
    };

    static updateQuantity (req, res, next) {
        const body = req.body;
        const id = req.params.id;
        const query = `UPDATE product SET quantity = ?, updated_by = ?, updated_at = (DATETIME('NOW', 'LOCALTIME')) WHERE id = ?`

        db.run(query, [body.quantity, body.updated_by, id], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success update product quantity' })
    };

    static updatePrice (req, res, next) {
        const body = req.body;
        const id = req.params.id;
        const query = `UPDATE product SET price = ?, updated_by = ?, updated_at = (DATETIME('NOW', 'LOCALTIME')) WHERE id = ?`

        db.run(query, [body.price, body.updated_by, id], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success update product price' })
    };

    static deleteProduct (req, res, next) {
        const id = req.params.id;
        const query = 'DELETE FROM product WHERE id = ?'

        db.run(query, [id], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success delete product' })
    };
}

module.exports = ModelProduct