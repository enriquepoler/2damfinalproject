var DB = require("./database")
const md5 = require('md5')

class CrudUser {

    constructor() { }

    static insertUser(User, callback) {
        
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO users (username, password, full_name, avatar) VALUES (?, ?, ?, ?)"

        conn.query(
            sql,
            [
                User.username,
                User.password,
                User.full_name,
                User.avatar
            ],
            function (err, results) {
                callback(err, results)
            }
        )

    }

    static getUserID(User, callback){
        let conn = DB.getConnection()
        let sql =
            "SELECT id FROM users WHERE username = ?"

        conn.query(
            sql,
            [
                User.username
            ],
            function (err, results) {
                
                callback(err, results[0])
            }
        )
    }

    static usernameExists(User, callback){
        let conn = DB.getConnection()
        let sql =
            "SELECT count(username) as usernameExists FROM users WHERE username = ?"

        conn.query(
            sql,
            [
                User.username
            ],
            function (err, results) {
                
                callback(err, results[0])
            }
        )
    
    }

    static login(User, callback){
        let conn = DB.getConnection()
        let sql =
            "SELECT * FROM users WHERE username = ? and password = ?"
        
        conn.query(
            sql,
            [
                User.username,
                //TO-DO: QUITAR md5 para cuando el cliente nos mande la pass ya encriptada 
                md5(User.password)
            ],
            function (err, results) {
                
                callback(err, results[0])
            }
        )
    }

    static askAssigByID(id_assignatura, callback) {
        let conn = DB.getConnection()
        let sql =
            "SELECT id_assig, cod_assig, nom_assig, modul, curs, hores FROM assignatura WHERE id_assig = ?"

        conn.query(
            sql,
            [
                id_assignatura
            ],
            function (err, results) {
                if(results.length == 1){
                    var resJson = {
                        id_assig: results[0].id_assig,
                        cod_assig: results[0].cod_assig,
                        nom_assig: results[0].nom_assig,
                        modul: results[0].modul,
                        curs: results[0].curs,
                        hores: results[0].hores
                    }
                    callback(err, resJson)
                }else{
                    callback(err, null)
                }
                
            }
        )

    }
}

module.exports = CrudUser

