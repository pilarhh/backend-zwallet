const createError = require('http-errors')

const roleAdmin = (req, res, next) => {
  const role = req.headers.rolexxx
  if (role === 'admin') {
    next()
  }
  next(createError(403, 'only admin can request'))
}

module.exports = {
  roleAdmin
}
