const handleNotFound = (req, res, next) => {
  res.status(404)
  res.json({
    message: 'url not found'
  })
}

const response = (res, result, status, message, pagination) => {
  res.status(status).json({
    status: 'Success',
    code: status || 200,
    data: result,
    message: message || null,
    pagination: pagination
  })
}

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode)
  res.json({
    status: statusCode,
    message: message
  })
}

module.exports = {
  handleNotFound,
  response,
  errorHandling
}
