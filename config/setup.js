const db = require("../config/db");

const createMerchant = `
    CREATE TABLE merchant (
        id              INTEGER PRIMARY KEY,
        password        VARCHAR NOT NULL,
        name            VARCHAR NOT NULL,
        address         TEXT NOT NULL,
        join_date       TEXT NOT NULL DEFAULT (DATETIME('NOW', 'LOCALTIME')),
        phone_number    VARCHAR NOT NULL
    )
`

const createProduct = `
    CREATE TABLE product (
        id              INTEGER PRIMARY KEY,
        merchant_id     INTEGER NOT NULL,
        name            VARCHAR NOT NULL,
        quantity        INTEGER NOT NULL,
        price           INTEGER NOT NULL,
        created_by      VARCHAR NOT NULL,
        created_at      TEXT NOT NULL DEFAULT (DATETIME('NOW', 'LOCALTIME')),
        updated_by      VARCHAR,
        updated_at      TEXT DEFAULT (DATETIME('NOW', 'LOCALTIME')),
        FOREIGN KEY (merchant_id) REFERENCES merchant (id)
    )
`

db.serialize(() => {
    db.run(createMerchant, (err) => {
        if (!err) {
            console.log('TABLE MERCHANT CREATED')
        }
        else {
            console.log(err)
        }
    })
})

db.serialize(() => {
    db.run(createProduct, (err) => {
        if (!err) {
            console.log('TABLE PRODUCT CREATED')
        }
        else {
            console.log(err)
        }
    })
})