var DB = require("./database")

class CrudAlumne {

    constructor() { }

    static insertAlumne(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO alumne (id_alumne) VALUES (?)"

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
    static askNotesAlumneByID(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "SELECT n.id_assig, a.cod_assig, n.nota FROM notes AS n, assignatura AS a WHERE n.id_alumne = ? AND n.id_assig = a.id_assig ORDER BY n.id_assig"

        conn.query(
            sql,
            [
                id
            ],
            function (err, results) {
                var resArray = []
                if(results.length >= 1){
                    for(let r of results){
                        resArray.push({
                            id_assig: r.id_assig,
                            cod_assig: r.cod_assig,
                            nota: r.nota,
                            links: {
                                get: "GET http://localhost:8090/assignatura/" + r.id_assig
                            }
                        })
                    }
                    callback(err, resArray)
                }else{
                    callback(err, null)
                }
                
            }
        )
    }

    static askNotaAlumneByID(id, id_assignatura, callback) {
        let conn = DB.getConnection()
        let sql =
            "SELECT n.id_assig, a.cod_assig, n.nota FROM notes AS n, assignatura AS a WHERE n.id_alumne = ? AND n.id_assig = a.id_assig and n.id_assig = ?"

        conn.query(
            sql,
            [
                id,
                id_assignatura
            ],
            function (err, results) {
                if(results.length == 1){
                    var resJson = {
                        id_assig: results[0].id_assig,
                        cod_assig: results[0].cod_assig,
                        nota: results[0].nota,
                        links: {
                            get: "GET http://localhost:8090/assignatura/" + results[0].id_assig
                        }
                    
                    }
                    callback(err, resJson)
                }else{
                    callback(err, null)
                }
                
            }
        )

    }
}

module.exports = CrudAlumne

