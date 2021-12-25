const express = require('express')
const usersController = require('../controllers/users')
const commonMiddle = require('../middleware/common')
const route = express.Router()

route.post('/', commonMiddle.validation, usersController.insertUsers)
route.post('/login', usersController.login)
route.post('/register', usersController.register)
route.get('/', usersController.getUsers)
route.put('/:id', usersController.updateUsers)
route.delete('/:id', usersController.deleteUsers)

module.exports = route
