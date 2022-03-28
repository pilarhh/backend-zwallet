/* eslint-disable camelcase */
const modelTransaction = require('../models/transaction')
const modelWallets = require('../models/wallets')
const modelUsers = require('../models/users')
const createError = require('http-errors')
const commonHelper = require('../helpers/common')

const getTransaction = async (req, res, next) => {
  try {
    const idUser = req.params.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit
    const user = await modelUsers.findUser('id', idUser)
    if (user) {
      const result = await modelTransaction.getTransaction({
        id: idUser,
        offset: offset,
        limit: limit
      })
      const resultCount = await modelTransaction.countTransaction()
      const { total } = resultCount[0]
      commonHelper.response(res, result, 200, 'data found', {
        currentPage: page,
        limit: limit,
        totalData: total,
        totalPage: Math.ceil(total / limit)
      })
    }
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const getTransactionOrder = async (req, res, next) => {
  try {
    const sort = req.query.sort || 'created_at'
    const order = req.query.order || 'desc'
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit
    const result = await modelTransaction.getTransactionOrder({
      sort: sort,
      order: order,
      offset: offset,
      limit: limit
    })
    const resultCount = await modelTransaction.countTransaction()
    const { total } = resultCount[0]
    commonHelper.response(res, result, 200, 'data found', {
      currentPage: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)
    })
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const insertTransaction = async (req, res, next) => {
  try {
    const { amount, notes, id_receiver } = req.body
    const id_sender = req.params.id
    const inv = `INV-${Math.floor((Math.random() * 99999))}`
    const data = {
      id: inv,
      amount: amount,
      notes: notes,
      type: 'Transfer',
      id_sender: id_sender,
      id_receiver: id_receiver
    }
    await modelTransaction.insertTransaction(data)
    await modelWallets.topUp(id_receiver, amount)
    await modelWallets.decrement(id_sender, amount)
    commonHelper.response(res, data, 201, 'transfered successfully')
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
    await modelTransaction.updateTransaction(data, id)
    commonHelper.response(res, data, 200, 'updated successfully')
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

const deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id

    await modelTransaction.deleteTransaction(id)
    commonHelper.response(res, id, 200, 'deleted successfully')
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
  deleteTransaction,
  getTransactionOrder
}
