/* eslint-disable camelcase */
const modelUsers = require('../models/users')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')
const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.username || ''
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
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

const userDetail = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await modelUsers.getUserDetail(id)
    commonHelper.response(res, result, 200, 'data found')
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
    const { email } = req.body
    const [user] = await userModel.find(email)
    const [result] = await modelUsers.getUserLogin(email)
    console.log(user)
    if (!user) {
      return next(createError(403, 'your email or password is wrong'))
    }
    // const resultHash = await bcrypt.compare(password, user.password)
    // if (!resultHash) return next(createError(403, 'your email or password is wrong'))
    const secretKey = process.env.SECRET_KEY_JWT
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role
    }
    const verifyOptions = {
      expiresIn: 60 * 60
    }
    const token = jwt.sign(payload, secretKey, verifyOptions)
    result.token = token

    commonHelper.response(res, result, 200, 'login successful')
  } catch (error) {
    console.log(error)
    next(createError(500, new createError.InternalServerError()))
  }
}

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

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
      verified: 'no'
    }

    await userModel.create(data)
    // const secretKey = process.env.SECRET_KEY_JWT
    // const payload = {
    //   email: data.email,
    //   id: data.id
    // }
    // const verifyOptions = {
    //   expiresIn: 60 * 60
    // }
    // const token = jwt.sign(payload, secretKey, verifyOptions)

    commonHelper.sendEmail(email)
    commonHelper.response(res, data, 201, 'submitted successfully')
    // console.log(token)
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const uploadProfilePicture = async (req, res, next) => {
  try {
    const id = req.params.id
    const fileName = req.file.filename
    const data = { profile_picture: `${process.env.BASE_URL}/file/${fileName}` }
    await modelUsers.updateUsers(data, id)
    commonHelper.response(res, data, 200, 'profile picture is updated')
  } catch (error) {
    console.log(error)
    console.log(req.file)
    next(createError(500, new createError.InternalServerError()))
  }
}

const setUserVerified = async (req, res, next) => {
  try {
    const id = req.id
    const data = {
      verified: 'yes'
    }
    const result = await modelUsers.setVerifiedUser(data, id)
    commonHelper.response(res, [data, result], 200, 'Your account has been verified')
  } catch (error) {
    const errorRes = new Error('Internal Server Error')
    errorRes.status = 500
    console.log(error)
    next(errorRes)
  }
}

const changePin = async (req, res, next) => {
  try {
    const id = req.params.id
    const { pin } = req.body
    const data = {
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

const changePhone = async (req, res, next) => {
  try {
    const id = req.params.id
    const { phone_number } = req.body
    const data = {
      phone_number: phone_number,
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

module.exports = {
  getUsers,
  updateUsers,
  insertUsers,
  deleteUsers,
  login,
  register,
  changePin,
  uploadProfilePicture,
  setUserVerified,
  userDetail,
  changePhone
}
