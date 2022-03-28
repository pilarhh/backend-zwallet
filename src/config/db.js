const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '44.202.197.206',
  user: 'fazz3pilar',
  password: 'pilarhFazz1234#',
  database: 'fazz3pilar_zwallet-br'
})

module.exports = connection
