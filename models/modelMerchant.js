const db = require('../config/db')

class ModelMerchant {
    static getMerchant (req, res, next) {
        const query = 'SELECT * FROM merchant'
        db.all(query, (err, row) => {
            if (err) {
                console.log(err)
            }
            res.status(200).json(row)
        })
    }

    static getMerchantByName (req, res, next) {
        const query = 'SELECT * FROM merchant WHERE name = ?'
        const id = req.params.id
        db.all(query, [id], function (err, result){
            if (result.length == 0) {
                console.log(err)
                res.status(404).json({ message : 'Merchant data not found'})
            }
            else {
                res.status(200).json(result)
            }
        })
    }

    static findMerchantByNameAndPassword (name, password) {
        const query = `SELECT * FROM merchant WHERE name = '${name}' AND password = '${password}'`
        return new Promise (function (resolve, reject) {
            db.get(query, (err, row) => {
                resolve(row)
                if (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    }
    
    static registerMerchant (req, res, next) {
        const body = req.body;
        if (body.name == null) {
            res.status(400).json({ message: 'Name is required' })
        }
        if (body.address == null) {
            res.status(400).json({ message: 'Address is required' })
        }
        if (body.phone_number == null) {
            res.status(400).json({ message: 'Phone Number is required' })
        }

        const query = `INSERT INTO merchant (id, password, name, address, join_date, phone_number) VALUES (?, ?, ?, ?, DATETIME('NOW', 'LOCALTIME'), ?)`
        db.run(query, [body.id, body.password, body.name, body.address, body.join_date, body.phone_number], function(err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(200).json({ message: 'Success register new merchant data'})
    }

    static updateMerchant (req, res, next) {
        const queryGet = 'SELECT * FROM merchant WHERE id = ?'
        const query = 'UPDATE merchant SET password = ? WHERE id = ?'
        const id = req.params.id
        const body = req.body
        const errCheck = db.all(queryGet, [id], (err, result) => {
            console.log(result)
            if (result.length == 0) {
                console.log(err)
                res.status(404).json({ message : 'Merchant data not found'})
            }
            db.run(query, [body.password, id], (errUpdate, result) => {
                if (errUpdate) {
                    console.log(errUpdate)
                }
                else {
                    res.status(200).json({ message : 'Success update merchant data'})
                }
            })
        })
    }

    static deleteMerchant (req, res, next) {
        const id = req.params.id;
        const query = 'DELETE FROM merchant WHERE id = ?'

        db.run(query, [id], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success delete merchant' })
    };
}

module.exports = ModelMerchant