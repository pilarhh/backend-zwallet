/* eslint-disable camelcase */
const connection = require('../config/db')

const getUsers = ({ search, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE username LIKE '%${search}%' LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
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

const uploadProfilePicture = (email, role, profile_picture) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE users SET profile_picture = ? WHERE email = ? AND role = ?'
    connection.query(sql, [profile_picture, email, role], (error, result) => {
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
  countUsers,
  uploadProfilePicture
}
