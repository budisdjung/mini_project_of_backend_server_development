const sqlite3 = require('sqlite3').verbose();
const merchantdb = new sqlite3.Database('merchant.db')

module.exports = merchantdb