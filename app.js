require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routerMerchant = require('./routes/routerMerchant');
const routerProduct = require('./routes/routerProduct');

app.use(bodyParser.json());
app.use('/merchant', routerMerchant);
app.use('/product', routerProduct);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})

