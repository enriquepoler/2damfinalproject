var db = require("./database");

class CrudProfessor {

    constructor() { }

    insertProfessor(Professor, callback) {
        let conn = this.db.getConnection();
        let sql =
            "INSERT INTO professor (id_professor, departament) VALUES (?, ?)";

        conn.query(
            sql,
            [
                Professor.id_professor,
                Alumne.departament
            ],
        ).then(results => {
            conn.end 
            callback(results)
        }).catch(err => console.log(err));

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
