var db = require("./database");

class CrudProfessor {

    constructor() { }

    insertProfessor(Professor) {
        let conn = this.db.getConnection();
        let sql =
            "INSERT INTO professor (id_professor, departament) VALUES (?, ?)";

        conn.query(
            sql,
            [
                Professor.id_professor,
                Professor.departament
            ],
            function (err, results) {

                return new Promise((resolve, reject) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                })
            }
        )
    }

    isProfessor(dni){
        let conn = this.db.getConnection();
        let sql =
            "SELECT count(dni) FROM dni_profe WHERE dni = ?";

        conn.query(
            sql,
            [
                dni
            ],
            function (err, results) {

                return new Promise((resolve, reject) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                })
            }
        )
    }

    /*getAllPlanets(callback) {
        let conn = this.db.getConnection();
        let sql =
            "SELECT id, name, rotation_period, orbitation_period, diameter, climate, gravity, terrain, population from planet";
        conn.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                conn.end();
                callback(results, fields);
            }
        });
    }*/
}

module.exports = {
    CrudProfessor:CrudProfessor,
};
