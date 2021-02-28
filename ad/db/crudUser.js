var DB = require("./database");
const md5 = require('md5')

class CrudUser {

    constructor() { }

    static insertUser(User, callback) {
        
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO users (username, password, full_name, avatar) VALUES (?, ?, ?, ?)";

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
            "SELECT id FROM users WHERE username = ?";

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
            "SELECT count(username) as usernameExists FROM users WHERE username = ?";

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
            "SELECT * FROM users WHERE username = ? and password = ?";

        conn.query(
            sql,
            [
                User.username,
                md5(User.password)
            ],
            function (err, results) {
                
                callback(err, results[0])
            }
        )
    }
}

module.exports = CrudUser

