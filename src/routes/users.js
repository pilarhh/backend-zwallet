const express = require('express')
const usersController = require('../controllers/users')
const commonMiddle = require('../middleware/common')
const route = express.Router()

route.post('/', commonMiddle.roleAdmin, usersController.insertUsers)
route.post('/login', usersController.login)
route.post('/register', commonMiddle.validation, usersController.register)
route.get('/', commonMiddle.roleAdmin, usersController.getUsers)
route.put('/:id', commonMiddle.validation, usersController.updateUsers)
route.delete('/:id', commonMiddle.roleAdmin, usersController.deleteUsers)

module.exports = route
