const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty123',
  database: 'zwallet'
})

module.exports = connection
