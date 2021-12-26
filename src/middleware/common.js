const createError = require('http-errors')
const joi = require('joi')

const roleAdmin = (req, res, next) => {
  const role = req.headers.role
  if (role === 'admin') {
    next()
  }
  next(createError(403, 'only admin can request'))
}

const validation = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { username, email, password, pin } = req.body
  const schema = joi.object({
    username: joi.string().alphanum().min(6).max(16).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(6).max(10).required(),
    pin: joi.number().required()
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
