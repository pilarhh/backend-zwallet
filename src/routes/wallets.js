const express = require('express')
const walletsController = require('../controllers/wallets')
const route = express.Router()
const { protect, isAdmin } = require('../middleware/auth')
const { hitCacheProduct } = require('../middleware/redis')

route.get('/', protect, isAdmin, hitCacheProduct, walletsController.getWallets)
route.post('/', walletsController.insertWallets)
route.put('/:id', walletsController.updateWallets)
route.delete('/:id', isAdmin, walletsController.deleteWallets)

module.exports = route
