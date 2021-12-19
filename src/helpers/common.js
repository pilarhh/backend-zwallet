const handleNotFound = (req, res, next)=>{
    res.status(404)
    res.json({
        message: 'url not found'
    })
}

const responseGet = (res, result, status, error)=>{
    res.status(status).json({
        status: 'Success',
        code: status || 200,
        data: result,
        message: error || 'data found'
    })
}

const responsePost = (res, result, status, error)=>{
    res.status(status).json({
        status: 'Success',
        code: status || 201,
        data: result,
        message: error || 'submitted successfully'
    })
}

const responsePut = (res, result, status, error)=>{
    res.status(status).json({
        status: 'Success',
        code: status || 200,
        data: result,
        message: error || 'updated successfully'
    })
}

const responseDelete = (res, result, status, error)=>{
    res.status(status).json({
        status: 'Success',
        code: status || 200,
        data: result,
        message: error || 'deleted successfully'
    })
}

const errorHandling = (err, req, res, next)=>{
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
    responseGet,
    responsePost,
    responsePut,
    responseDelete,
    errorHandling
}