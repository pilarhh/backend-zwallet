const express = require('express')
const usersController = require('../controllers/users')
const route = express.Router()

route.post('/', usersController.insertUsers)
route.get('/', usersController.getUsers)
route.put('/:id', usersController.updateUsers)
route.delete('/:id', usersController.deleteUsers)

module.exports = route