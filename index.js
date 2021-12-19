require('dotenv').config()
const express = require('express');
const usersRoute = require('./src/routes/users')
const walletsRoute = require('./src/routes/wallets')
const transactionRoute = require('./src/routes/transaction')
const commonHelper = require('./src/helpers/common')
const morgan = require('morgan');
const PORT = 4000;
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRoute)
app.use('/wallets', walletsRoute)
app.use('/transaction', transactionRoute)

app.use(commonHelper.handleNotFound)

app.use(commonHelper.errorHandling)

app.listen(PORT, ()=>{
    console.log(`server starting on port ${PORT}`)
})