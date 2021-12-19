const express = require('express')
const transactionController = require('../controllers/transaction')
const route = express.Router()

route.post('/', transactionController.insertTransaction)
route.get('/', transactionController.getTransaction)
route.put('/:id', transactionController.updateTransaction)
route.delete('/:id', transactionController.deleteTransaction)

module.exports = route