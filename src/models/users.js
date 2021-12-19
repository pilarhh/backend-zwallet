const connection = require('../config/db')

const getUsers = ({search}) =>{
    return new Promise ((resolve, reject)=>{
        connection.query(`SELECT * FROM users WHERE username LIKE '%${search}%'`, (error, result)=> {
            if(!error) {
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

const insertUsers = (data)=> {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO users SET ?`, data, (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateUsers = (data, id) => {
    return new Promise ((resolve, reject)=>{
        connection.query(`UPDATE users SET ? WHERE id = ?`, [data, id], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteUsers = (id)=> {
    return new Promise ((resolve, reject)=>{
        connection.query(`DELETE FROM users WHERE id = ?`, id, (error, result)=>{
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
    deleteUsers
}