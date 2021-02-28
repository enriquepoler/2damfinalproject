var DB = require("./database");

class CrudProfessor {

    constructor() { }

    static insertProfessor(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO professor (id_professor) VALUES (?)";

        conn.query(
            sql,
            [
                id
            ],
            function (err, results) {

                callback(err, results)
            }
        )
    }

    static isProfessor(dni, callback){
        let conn = DB.getConnection()
        let sql =
            "SELECT count(dni) as isProfe FROM dni_profe WHERE dni = ?";

        conn.query(
            sql,
            [
                dni
            ],
            function (err, results) {
                callback(err, results[0])
            }
        )
    }

}

module.exports = CrudProfessor

