const modelWallets = require('../models/wallets')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

const getWallets = async (req, res, next)=>{
    try {
        const result = await modelWallets.getWallets()
        commonHelper.responseGet(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const insertWallets = async (req, res, next)=>{
    try {
        const {first_name, last_name, phone_number, balance, id_user} = req.body
        const data = {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            balance: balance,
            id_user: id_user
        }
        const result = await modelWallets.insertWallets(data)
        commonHelper.responsePost(res, result, 201)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const updateWallets = async (req, res, next)=> {
    try {
        const id = req.params.id
        const {first_name, last_name, phone_number, balance, id_user} = req.body
        const data = {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            balance: balance,
            id_user: id_user
        }
        const result = await modelWallets.updateWallets(data, id)
        commonHelper.responsePut(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const deleteWallets = async (req, res, next)=> {
    try {
        const id = req.params.id

        const result = await modelWallets.deleteWallets(id)
        commonHelper.responseDelete(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    getWallets,
    insertWallets,
    updateWallets,
    deleteWallets
}