const connection = require('../config/db')

const getTransaction = ({ sort, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM transaction ORDER BY ?? ${order}`, sort, (error, result) => {
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

module.exports = {
  getTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction
}
