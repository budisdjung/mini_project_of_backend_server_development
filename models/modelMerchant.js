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
    
    static createMerchant (req, res, next) {
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

        const query = "INSERT INTO merchant (id, password, name, address, join_date, phone_number) VALUES (?, ?, ?, ?, DATETIME('NOW', 'LOCALTIME'), ?)"
        db.run(query, [body.id, body.password, body.name, body.address, body.join_date, body.phone_number], function(err, row) {
            if (err) {
                console.log(err)
                cb(err)
            } else {
                cb(row)
            }
        })
    }

    static deleteMerchant (req, res, next) {
        const id = req.params.id;
        const query = "DELETE FROM merchant WHERE id = ?"

        db.run(query, [id], function (err) {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).json({ message: 'Success delete merchant' })
    };
}

module.exports = ModelMerchant