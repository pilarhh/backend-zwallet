const modelTransaction = require('../models/transaction')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

const getTransaction = async (req, res, next)=>{
    try {
        const sort = req.query.sort || "date_time"
        const order = req.query.order || "desc"
        const result = await modelTransaction.getTransaction({
            sort: sort,
            order: order
        })
        commonHelper.responseGet(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const insertTransaction = async (req, res, next)=> {
    try {
        const {amount, notes, id_sender, id_receiver} = req.body
        const data = {
            amount: amount,
            notes: notes,
            id_sender: id_sender,
            id_receiver: id_receiver
        }
        const result = await modelTransaction.insertTransaction(data)
        commonHelper.responsePost(res, result, 201)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const updateTransaction = async (req, res, next)=> {
    try {
        const id = req.params.id
        const {amount, notes, date_time, id_sender, id_receiver} = req.body
        const data = {
            amount: amount,
            notes: notes,
            id_sender: id_sender,
            id_receiver: id_receiver
        }
        const result = await modelTransaction.updateTransaction(data, id)
        commonHelper.responsePut(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const deleteTransaction = async (req, res, next)=> {
    try {
        const id = req.params.id

        const result = await modelTransaction.deleteTransaction(id)
        commonHelper.responseDelete(res, result, 200)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    getTransaction,
    updateTransaction,
    insertTransaction,
    deleteTransaction
}