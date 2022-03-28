const express = require('express')
const transactionController = require('../controllers/transaction')
const route = express.Router()
// const { protect } = require('../middleware/auth')

route.post('/:id', transactionController.insertTransaction)
route.get('/:id_sender', transactionController.getTransactionOrder)
route.put('/:id', transactionController.updateTransaction)
route.delete('/:id', transactionController.deleteTransaction)
route.get('/expense/:id_sender', transactionController.expense)
route.get('/income/:id_sender', transactionController.income)

module.exports = route
