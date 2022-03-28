/* eslint-disable camelcase */
const connection = require('../config/db')

const getUsers = ({ search, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT users.id, users.email, users.username, users.phone_number, users.pin, users.profile_picture, wallets.id AS wallet_id, wallets.balance FROM users JOIN wallets ON (wallets.id_user = users.id) WHERE username LIKE '%${search}%' LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getUserDetail = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT users.id, users.email, users.username, users.phone_number, users.pin, users.profile_picture, wallets.id AS wallet_id, wallets.balance FROM users JOIN wallets ON (wallets.id_user = users.id) WHERE users.id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getUserLogin = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT users.id, users.email, users.username, users.phone_number, users.pin, users.profile_picture, wallets.id AS wallet_id, wallets.balance FROM users JOIN wallets ON (wallets.id_user = users.id) WHERE email = ?', email, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertUsers = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateUsers = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const findUser = (field, record) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE ${field} = '${record}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        console.log(error)
        reject(error)
      }
    })
  })
}

const countUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM users', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const setVerifiedUser = (data, email) => {
  return Promise((resolve, reject) => {
    connection.query('UPDATE users SET ? WHERE id = ?', [data, email], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
  findUser,
  countUsers,
  setVerifiedUser,
  getUserDetail,
  getUserLogin
}
