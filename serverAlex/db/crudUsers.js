const db = require('./database');
const User = require('./users');

module.exports = class crudUsers{
    mydb = new db();
    constructor(){}

    getUserAuth(username, password, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT id, avatar FROM users WHERE username = ? AND password = ?";
        con.query(sql, [username, password], function(err, results){
            if(err){
                console.error(err);
            } else{
                con.end();
                if(results.length){
                    var user = {
                        id: results[0].id,
                        avatar: results[0].avatar
                    }
                } else{
                    var user = {
                        id: null,
                        avatar: null
                    }
                }
            }
            callback(err, user);
        });
    }
    
    getUserByUsername(username, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT * FROM users WHERE username = ?";
        con.query(sql, [username], function(err, results){
            if(err){
                console.error(err);
            } else{
                con.end();
            }
            callback(results, err);
        });
    }
    
    getProfeById(id, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT * FROM professor WHERE id_professor = ?";
        con.query(sql, [id], function(err, results){
            if(err){
                console.error(err);
            } else{
                con.end();
            }
            callback(results, err);
        });
    }

    checkDNIProfe(dni, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT * FROM dni_profe WHERE dni = ?";
        con.query(sql, [dni], function(err, results){
            if(err){
                console.error(err);
            } else{
                con.end();
            }
            callback(results, err);
        });
    }

    insertUser(user, callback){
        let con = this.mydb.getConnection();
        let sql = "INSERT INTO users(username, password, full_name, avatar) VALUES(?, ?, ?, ?)";
        con.query(sql, [user.username, user.password, user.full_name, user.avatar], (err, results)=>{
            if(err){
                console.error(err);
            } else{
                con.end();
            }
            callback(err, results);
        });
    }

    insertProfe(id){
        let con = this.mydb.getConnection();
        let sql = "INSERT INTO professor(id_professor) VALUES(?)";
        con.query(sql, [id], (err, results)=>{
            if(err){
                console.error(err);
            } else{
                con.end();
            }
        });
    }

    insertAlumne(id){
        let con = this.mydb.getConnection();
        let sql = "INSERT INTO alumne(id_alumne) VALUES(?)";
        con.query(sql, [id], (err, results)=>{
            if(err){
                console.error(err);
            } else{
                con.end();
            }
        });
    }
};