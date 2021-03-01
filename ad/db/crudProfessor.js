var DB = require("./database") 

class CrudProfessor {

    constructor() { }

    static insertProfessor(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "INSERT INTO professor (id_professor) VALUES (?)" 

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
            "SELECT count(dni) AS isProfe FROM dni_profe WHERE dni = ?" 

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

    static isProfessorByID(id, callback){
        let conn = DB.getConnection()
        let sql =
            "SELECT count(id_professor) AS isProfe FROM professor WHERE id_professor = ?"

        conn.query(
            sql,
            [
                id
            ],
            function (err, results) {
                callback(err, results[0])
            }
        )
    }

    static askModuls(id, callback) {
        let conn = DB.getConnection()
        let sql =
            "SELECT DISTINCT a.id_assig, a.cod_assig, a.nom_assig, a.modul, a.curs, a.hores FROM assignatura AS a, notes AS n WHERE n.id_profe = ? AND n.id_assig = a.id_assig"

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
                            nom_assig: r.nom_assig,
                            modul: r.modul,
                            curs: r.curs,
                            hores: r.hores
                        })
                    }
                    callback(err, resArray)
                }else{
                    callback(err, null)
                }
                
            }
        )
    }

    static askModuls(id, id_assignatura, callback) {
        let conn = DB.getConnection()
        let sql =
            "SELECT DISTINCT n.id_alumne, u.full_name, n.id_assig, a.cod_assig, n.nota FROM notes AS n, users AS u, assignatura AS a WHERE n.id_alumne = u.id AND n.id_assig = a.id_assig AND n.id_profe = ? AND n.id_assig = ? ORDER BY n.id_assig"

        conn.query(
            sql,
            [
                id,
                id_assignatura
            ],
            function (err, results) {
                var resArray = []
                if(results.length >= 1){
                    for(let r of results){
                        resArray.push({
                            id_alumne: r.id_alumne,
                            full_name: r.full_name,
                            id_assig: r.id_assig,
                            cod_assig: r.cod_assig,
                            nota: r.nota,
                            links: {
                                assig: "GET http://localhost:8090/assignatura/" + r.id_assig,
                                alumne: "GET http://localhost:8090/alumne/" + r.id_alumne,
                                nota: "PUT http://localhost:8090/moduls/" + r.id_assig + "/" + r.id_alumne
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
    
    static setNotaByIdAssigAndIdAlu(id, id_assignatura, id_alumne, notaByProfe, callback) {
        let conn = DB.getConnection()
        let sql =
            "UPDATE notes SET nota = ? WHERE id_profe = ? AND id_assig = ? AND id_alumne = ?"

        conn.query(
            sql,
            [
                notaByProfe,
                id,
                id_assignatura,
                id_alumne
            ],
            function (err, results) {

                callback(err, results) 
            }
        )
    }
}

module.exports = CrudProfessor