/* eslint-disable no-unused-expressions */
/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
chai.use(chaiHttp)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtlc2hpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ0Nzg2MDg4LCJleHAiOjE2NDQ3ODk2ODh9.d-g3efO1_hxpywmZ90tNGZSjRsy4M-mD7W7InXlX3_M'

const baseGetUnit = (route) => {
  return chai.request('http://localhost:4000').get(`/${route}`).set({ Authorization: `Bearer ${token}` })
}

const basePostUnit = (route) => {
  return chai.request('http://localhost:4000/users').post(`/${route}`)
}

const basePutUnit = (route) => {
  return chai.request('http://localhost:4000').put(`/${route}`).set({ Authorization: `Bearer ${token}` })
}

const baseDeleteUnit = (route) => {
  return chai.request('http://localhost:4000').delete(`/${route}`).set({ Authorization: `Bearer ${token}` })
}

const name = 'keshi'

describe('Get All Users', () => {
  it('expect to show all users', (done) => {
    baseGetUnit('users')
      .end((err, res) => {
        expect(res.body).to.have.property('code', 200)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.equal('data found')
        done()
      })
  })

  it('expect to get data by searching name', (done) => {
    baseGetUnit(`users?username=${name}`)
      .end((err, res) => {
        expect(res.body).to.have.property('code', 200)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.equal('data found')
        done()
      })
  })

  it('expect wrong url', (done) => {
    baseGetUnit('userss')
      .end((err, res) => {
        expect(res.body.message).to.equal('url not found')
        done()
      })
  })
})

const newUser = {
  username: 'teddyyy',
  email: 'teddy@gmail.com',
  password: 'tedted'
}

const falseNewUser = {
  username: 'keshiii',
  email: 'keshi@gmail.com',
  password: 'kkkkkk'
}

describe('Register User', () => {
  it('expect to register new user', (done) => {
    basePostUnit('register')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.have.property('code', 201)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.have.property('id')
        expect(res.body.data).to.have.property('username')
        expect(res.body.data).to.have.property('email')
        expect(res.body.message).to.equal('submitted successfully')
        done()
      })
  })

  it('expect to not register with email already registered', (done) => {
    basePostUnit('register')
      .send(falseNewUser)
      .end((err, res) => {
        expect(res.body).to.have.property('status', 403)
        expect(res.body.message).to.equal('this email has already been used')
        done()
      })
  })
})

const user = {
  email: 'keshi@gmail.com',
  password: 'kkkkkk'
}

const falseUser = {
  email: 'keshii@gmail.com',
  password: 'kkkkkkk'
}

describe('Login User', () => {
  it('expect user login', (done) => {
    basePostUnit('login')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.have.property('code', 200)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.have.property('id')
        expect(res.body.data).to.have.property('username')
        expect(res.body.data).to.have.property('email')
        expect(res.body.data).to.have.property('phone_number')
        expect(res.body.data).to.have.property('profile_picture')
        expect(res.body.data).to.have.property('token')
        expect(res.body.message).to.equal('login successful')
        done()
      })
  })

  it('wrong username or password', (done) => {
    basePostUnit('login')
      .send(falseUser)
      .end((err, res) => {
        expect(res.body).to.have.property('status', 403)
        expect(res.body.message).to.equal('your email or password is wrong')
        done()
      })
  })
})

const idEditUser = '17382953-f35d-4b25-8a77-665f2c25942c'

const editUser = {
  username: 'rich brian',
  email: 'rich@gmail.com',
  password: 'rrrrrr',
  pin: '0000'
}

describe('Edit Users', () => {
  it('expect to edit user', (done) => {
    basePutUnit(`users/${idEditUser}`)
      .send(editUser)
      .end((err, res) => {
        expect(res.body).to.have.property('code', 200)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.have.property('username')
        expect(res.body.data).to.have.property('email')
        expect(res.body.message).to.equal('updated successfully')
        done()
      })
  })
})

const id = 12

describe('Delete Users', () => {
  it('expect to delete user', (done) => {
    baseDeleteUnit(`users/${id}`)
      .end((err, res) => {
        expect(res.body).to.have.property('code', 200)
        expect(res.body).to.be.an('object')
        expect(res.body.data).to.equal(`${id}`)
        expect(res.body.message).to.equal(`data with id ${id} deleted successfully`)
        done()
      })
  })
})
