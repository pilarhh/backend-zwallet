const express = require('express')
const usersController = require('../controllers/users')
const commonMiddle = require('../middleware/common')
const route = express.Router()
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

route.post('/', usersController.insertUsers)
route.post('/login', usersController.login)
route.post('/register', commonMiddle.validation, usersController.register)
route.get('/', protect, usersController.getUsers)
route.put('/:id', commonMiddle.validation, usersController.updateUsers)
route.put('/changepin/:id', commonMiddle.validation, usersController.changePin)
route.delete('/:id', usersController.deleteUsers)
route.post('/profile-picture', upload.single('profile_picture'), usersController.uploadProfilePicture)

module.exports = route
