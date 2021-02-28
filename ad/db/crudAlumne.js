var DB = require("./database");

class CrudAlumne {

    constructor() { }

    static insertAlumne(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO alumne (id_alumne) VALUES (?)";

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
}

module.exports = {
    CrudAlumne: CrudAlumne,
};
