const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const userModel = require('../models/user')
const commonHelper = require('../helpers/common')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const [user] = await userModel.find(email)
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
    const { email, password, name } = req.body

    const user = await userModel.find(email)
    // console.log(user);
    console.log(user)
    if (user.length > 0) {
      return next(createError(403, 'email is ready'))
    }

    // eslint-disable-next-line node/handle-callback-err
    // bcrypt.genSalt(10, (err, salt) => {
    //   // console.log(err);
    //   console.log(salt);
    // });

    const passwordHash = await bcrypt.hash(password, 10)
    const data = {
      id: uuidv4(),
      email,
      password: passwordHash,
      name
    }
    const resultInsert = await userModel.create(data)
    commonHelper.response(res, resultInsert, 201, 'berhasil insert')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

module.exports = {
  login,
  register
}
