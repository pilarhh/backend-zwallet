const express = require('express')
const walletsController = require('../controllers/wallets')
const route = express.Router()

route.get('/', walletsController.getWallets)
route.post('/', walletsController.insertWallets)
route.put('/:id', walletsController.updateWallets)
route.delete('/:id', walletsController.deleteWallets)

module.exports = route
