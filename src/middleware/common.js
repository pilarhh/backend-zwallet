const createError = require('http-errors')
const joi = require('joi')

const roleAdmin = (req, res, next) => {
  const role = req.headers.rolexxx
  if (role === 'admin') {
    next()
  }
  next(createError(403, 'only admin can request'))
}

const validation = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { username, email, password, pin } = req.body
  const schema = joi.object({
    username: joi.string(),
    email: joi.string(),
    password: joi.string(),
    pin: joi.number()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    const errorMessage = error.details[0].message
    return next(createError(422, errorMessage))
  }
  next()
}

module.exports = {
  roleAdmin,
  validation
}
