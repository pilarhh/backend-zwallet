const express = require('express')
const transactionController = require('../controllers/transaction')
const route = express.Router()
const { protect } = require('../middleware/auth')

route.post('/', transactionController.insertTransaction)
route.get('/', protect, transactionController.getTransaction)
route.put('/:id', transactionController.updateTransaction)
route.delete('/:id', transactionController.deleteTransaction)

module.exports = route
