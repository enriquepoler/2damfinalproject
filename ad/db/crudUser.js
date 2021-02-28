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
                md5(User.password),
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
                
                callback(err, results)
            }
        )
    }
}

module.exports = CrudUser

