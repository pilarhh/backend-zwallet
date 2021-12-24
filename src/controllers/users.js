const modelUsers = require('../models/users')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

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

module.exports = {
  getUsers,
  updateUsers,
  insertUsers,
  deleteUsers
}
