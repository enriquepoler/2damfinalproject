const db = require('./database');

module.exports = class crudAssignatures{
    mydb = new db();
    constructor(){}

    getAssigById(assigId, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT * FROM assignatura WHERE id_assig = ?"
        con.query(sql, [assigId], (err, results)=>{
            if(err){
                console.error(err);
            }
            callback(err, results);
        })
    }

    getProfesAssigs(profeId, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT a.* FROM assignatura as a, notes as n WHERE n.id_profe = ? AND n.id_assig = a.id_assig"
        con.query(sql, [profeId], (err, results)=>{
            if(err){
                console.error(err);
            } else {
                var assigs = []
                results.forEach(assig => {
                    assigs.push(assig);
                });
            }
            callback(err, assigs);
        })
    }
}