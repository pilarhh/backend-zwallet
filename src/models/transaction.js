const connection = require('../config/db')

const getTransaction = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM transaction LIMIT ? OFFSET ?', [offset, limit], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getTransactionOrder = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM transaction ORDER BY ?? ${order} LIMIT ? OFFSET ?`, [sort, limit, offset], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateTransaction = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE transaction SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM transaction WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const countTransaction = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM wallets', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getTransaction,
  getTransactionOrder,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  countTransaction
}
