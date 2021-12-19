const connection = require('../config/db')

const getWallets = () =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM wallets`, (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

const insertWallets = (data)=> {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO wallets SET ?`, data, (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateWallets = (data, id) => {
    return new Promise ((resolve, reject)=>{
        connection.query(`UPDATE wallets SET ? WHERE id = ?`, [data, id], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteWallets = (id)=> {
    return new Promise ((resolve, reject)=>{
        connection.query(`DELETE FROM wallets WHERE id = ?`, id, (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getWallets,
    insertWallets,
    updateWallets,
    deleteWallets
}