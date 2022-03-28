const express = require('express')
const transactionController = require('../controllers/transaction')
const route = express.Router()
// const { protect } = require('../middleware/auth')

route.post('/:id', transactionController.insertTransaction)
route.get('/', transactionController.getTransactionOrder)
route.put('/:id', transactionController.updateTransaction)
route.delete('/:id', transactionController.deleteTransaction)

module.exports = route
