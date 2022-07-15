const merchantdb = require("../config/merchantdb");
const productdb = require("../config/productdb")

const createMerchant = `
    CREATE TABLE merchant (
        id INTEGER PRIMARY KEY,
        password VARCHAR NOT NULL,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        join_date DATE DEFAULT CURRENT_DATE,
        phone_number INTEGER NOT NULL
    )
`

const createProduct = `
    CREATE TABLE product (
        id INTEGER PRIMARY KEY,
        name VARCHAR NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL
    )
`

merchantdb.serialize(() => {
    merchantdb.run(createMerchant, (err) => {
        if (!err) {
            console.log('TABLE MERCHANT CREATED')
        }
        else {
            console.log(err)
        }
    })
})

productdb.serialize(() => {
    productdb.run(createProduct, (err) => {
        if (!err) {
            console.log('TABLE PRODUCT CREATED')
        }
        else {
            console.log(err)
        }
    })
})