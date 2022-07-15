const sqlite3 = require('sqlite3').verbose();
const productdb = new sqlite3.Database('product.db')

module.exports = productdb