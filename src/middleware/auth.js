const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const protect = (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    return next(createError(403, 'you need token to access'))
  }
  try {
    const secretKey = process.env.SECRET_KEY_JWT
    const decoded = jwt.verify(token, secretKey)
    req.email = decoded.email
    req.role = decoded.role
    next()
  } catch (err) {
    if (err && err.name === 'JsonWebTokenError') { return next(createError(400, 'Token is invalid')) } else if (err && err.name === 'TokenExpiredError') { return next(createError(400, 'Token has expired')) } else {
      return next(createError(400, 'Token is not actived'))
    }
  }
}

const emailToken = (req, res, next) => {
  try {
    const token = req.params.token
    const secretKey = process.env.SECRET_KEY
    const decoded = jwt.verify(token, secretKey)
    req.email = decoded.email
    req.id = decoded.id
    next()
  } catch (err) {
    if (err && err.name === 'JsonWebTokenError') { return next(createError(400, 'Token is invalid')) } else if (err && err.name === 'TokenExpiredError') { return next(createError(400, 'Token has expired')) } else {
      return next(createError(400, 'Token is not actived'))
    }
  }
}

const isAdmin = (req, res, next) => {
  const role = req.role
  if (role !== 'admin') return next(createError(403, 'You cannot access'))
  next()
}

module.exports = {
  protect,
  isAdmin,
  emailToken
}
