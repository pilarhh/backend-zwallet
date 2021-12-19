const modelUsers = require('../models/users')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

const getUsers = async (req, res, next)=>{
    try {
        const search = req.query.username || ""
        const result = await modelUsers.getUsers({
            search: search
        })
        commonHelper.responseGet(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const insertUsers = async (req, res, next)=> {
    try {
        const {username, email, password, pin} = req.body
        const data = {
            username: username,
            email: email,
            password: password,
            pin: pin
        }
        const result = await modelUsers.insertUsers(data)
        commonHelper.responsePost(res, result, 201)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const updateUsers = async (req, res, next)=> {
    try {
        const id = req.params.id
        const {username, email, password, pin} = req.body
        const data = {
            username : username,
            email : email,
            password : password,
            pin: pin
        }
        const result = await modelUsers.updateUsers(data, id)
        commonHelper.responsePut(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const deleteUsers = async (req, res, next)=> {
    try {
        const id = req.params.id

        const result = await modelUsers.deleteUsers(id)
        commonHelper.responseDelete(res, result, 200)
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