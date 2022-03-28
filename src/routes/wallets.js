const express = require('express')
const walletsController = require('../controllers/wallets')
const route = express.Router()
const { protect, isAdmin } = require('../middleware/auth')

route.get('/', protect, isAdmin, walletsController.getWallets)
route.get('/:id', walletsController.getWalletDetail)
route.post('/topup/:id', walletsController.topUp)
route.post('/', walletsController.insertWallets)
route.put('/:id', walletsController.updateWallets)
route.delete('/:id', walletsController.deleteWallets)

module.exports = route
