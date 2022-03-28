const connection = require('../config/db')

const getWallets = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM wallets', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getWalletDetail = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT wallets.id, wallets.balance, wallets.id_user, users.username, users.phone_number FROM wallets JOIN users ON (wallets.id_user = users.id) WHERE wallets.id_user = ?', idUser, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertWallets = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO wallets SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateWallets = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE wallets SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteWallets = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM wallets WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const countWallets = () => {
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

const topUp = (idUser, amount) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE wallets SET balance = balance + ? WHERE id_user = ?', [amount, idUser], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const decrement = (idUser, amount) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE wallets SET balance = balance - ? WHERE id_user = ?', [amount, idUser], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      };
    })
  })
}

module.exports = {
  getWallets,
  insertWallets,
  updateWallets,
  deleteWallets,
  countWallets,
  topUp,
  decrement,
  getWalletDetail
}
