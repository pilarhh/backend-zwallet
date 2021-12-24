const express = require('express')
const usersController = require('../controllers/user')
const route = express.Router()

route.post('/login', usersController.login)
route.post('/register', usersController.register)

module.exports = route
