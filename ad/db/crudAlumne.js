var db = require("./database");

class CrudAlumne {

    constructor() { }

    insertAlumne(Alumne) {
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
    CrudAlumne: CrudAlumne,
};
