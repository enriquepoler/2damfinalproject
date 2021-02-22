var db = require("./database");

class CrudAlumne {

    constructor() { }

    insertAlumne(Alumne, callback) {
        let conn = this.db.getConnection();
        let sql =
            "INSERT INTO alumne (id_alumne, repetidor, curs) VALUES (?, ?, ?)";

        conn.query(
            sql,
            [
                Alumne.id_alumne,
                Alumne.repetidor,
                Alumne.curs
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
    CrudAlumne: CrudAlumne,
};
