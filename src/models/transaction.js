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

const getTransactionOrder = ({ id, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.amount, transaction.type, transaction.created_at, users.username as receiver, users.profile_picture as receiver_pic from transaction JOIN users ON (transaction.id_receiver = users.id) or (transaction.id_sender = users.id and type = 'Top up') WHERE transaction.id_sender = '${id}' ORDER BY ?? ${order} LIMIT ? OFFSET ?`, [sort, limit, offset], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

// const getTransactionOrder = ({ id, sort, order, limit, offset }) => {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT * FROM transaction WHERE transaction.id_sender = '${id}' ORDER BY ?? ${order} LIMIT ? OFFSET ?`, [sort, limit, offset], (error, result) => {
//       if (!error) {
//         resolve(result)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }

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

const getExpense = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT id_sender, SUM(amount) as amount FROM transaction WHERE id_sender = '${id}' and type = 'Transfer'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getIncome = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT id_sender, SUM(amount) as amount FROM transaction WHERE (id_receiver = '${id}' and type = 'Transfer') or (id_sender = '${id}' and type = 'Top up')`, (error, result) => {
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
  countTransaction,
  getExpense,
  getIncome
}
