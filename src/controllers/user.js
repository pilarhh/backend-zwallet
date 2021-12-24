const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/user')
const commonHelper = require('../helpers/common')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const [user] = await userModel.find(email)
    console.log(user)
    if (!user) {
      return next(createError(403, 'email atau password anda salah'))
    }
    const resultHash = await bcrypt.compare(password, user.password)
    if (resultHash) {
      commonHelper.response(res, null, 200, 'anda berhasil login')
    }
  } catch (error) {
    console.log(error)
    next(createError(500, new createError.InternalServerError()))
  }
}

const register = async (req, res, next) => {
  try {
    const { username, email, password, pin } = req.body

    const user = await userModel.find(email)
    console.log(user)
    if (user.length > 0) {
      return next(createError(403, 'this email has already been used'))
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const data = {
      id: uuidv4(),
      username,
      email,
      password: passwordHash,
      pin
    }
    await userModel.create(data)
    commonHelper.response(res, data, 201, 'submitted successfully')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

module.exports = {
  login,
  register
}
