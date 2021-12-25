const modelUsers = require('../models/users')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')
const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.username || ''
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit
    const result = await modelUsers.getUsers({
      search: search,
      offset: offset,
      limit: limit
    })
    const resultCount = await modelUsers.countUsers()
    const { total } = resultCount[0]
    commonHelper.response(res, result, 200, 'data found', {
      currentPage: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)
    })
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const insertUsers = async (req, res, next) => {
  try {
    const { username, email, password, pin } = req.body
    const data = {
      username: username,
      email: email,
      password: password,
      pin: pin
    }
    await modelUsers.insertUsers(data)
    commonHelper.response(res, data, 201, 'submitted successfully')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const updateUsers = async (req, res, next) => {
  try {
    const id = req.params.id
    const { username, email, password, pin } = req.body
    const data = {
      username: username,
      email: email,
      password: password,
      pin: pin,
      updated_at: new Date()
    }
    await modelUsers.updateUsers(data, id)
    commonHelper.response(res, data, 200, 'updated successfully')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id

    await modelUsers.deleteUsers(id)
    commonHelper.response(res, id, 200, `data with id ${id} deleted successfully`)
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

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
  getUsers,
  updateUsers,
  insertUsers,
  deleteUsers,
  login,
  register
}
