/* eslint-disable node/no-path-concat */
require('dotenv').config()
const usersRoute = require('./src/routes/users')
const walletsRoute = require('./src/routes/wallets')
const transactionRoute = require('./src/routes/transaction')
const commonHelper = require('./src/helpers/common')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
app.use(cors())

const io = new Server({
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  console.log('some user online')
  socket.on('disconnect', () => {
    console.log('some user offline')
  })
  socket.on('sendTransfer', (data) => {
    socket.to(parseInt(data.receiver)).emit('sendTransfer', data)
    console.log(data)
  })
})

io.listen(server)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRoute)
app.use('/wallets', walletsRoute)
app.use('/transaction', transactionRoute)

app.use('/file', express.static('./uploads'))

app.use(commonHelper.handleNotFound)

app.use(commonHelper.errorHandling)

server.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`)
})
