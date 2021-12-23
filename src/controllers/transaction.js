/* eslint-disable camelcase */
const modelTransaction = require('../models/transaction')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

const getTransaction = async (req, res, next) => {
  try {
    const sort = req.query.sort || 'date_time'
    const order = req.query.order || 'desc'
    const result = await modelTransaction.getTransaction({
      sort: sort,
      order: order
    })
    commonHelper.response(res, result, 201, 'data found')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const insertTransaction = async (req, res, next) => {
  try {
    const { amount, notes, id_sender, id_receiver } = req.body
    const data = {
      amount: amount,
      notes: notes,
      id_sender: id_sender,
      id_receiver: id_receiver
    }
    const result = await modelTransaction.insertTransaction(data)
    commonHelper.response(res, result, 201, 'submitted successfully')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const updateTransaction = async (req, res, next) => {
  try {
    const id = req.params.id
    const { amount, notes, id_sender, id_receiver } = req.body
    const data = {
      amount: amount,
      notes: notes,
      id_sender: id_sender,
      id_receiver: id_receiver,
      updated_at: new Date()
    }
    const result = await modelTransaction.updateTransaction(data, id)
    commonHelper.response(res, result, 200, 'updated successfully')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id

    const result = await modelTransaction.deleteTransaction(id)
    commonHelper.response(res, result, 200, 'deleted successfully')
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
