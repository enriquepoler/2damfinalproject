const db = require('./database');
const CONNECTION = require('../lib/constants').CONNECTION

module.exports = class crudNotes{
    mydb = new db();
    constructor(){}

    getNotesFromUser(aluID, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT n.nota, n.id_assig, a.cod_assig, a.nom_assig "+ 
                  "FROM notes as n, assignatura as a "+
                  "WHERE n.id_alumne = ? and n.id_assig = a.id_assig "+
                  "ORDER BY n.id_assig";
        con.query(sql, [aluID], function(err, results){
            if(err){
                console.error(err);
            } else{
                var res = []
                results.forEach(rdp=>{
                    res.push({
                        nota: rdp.nota,
                        nom_assig: rdp.nom_assig,
                        id_assig: rdp.id_assig,
                        cod_assig: rdp.cod_assig,
                        links: {
                            get: "GET "+CONNECTION+"/assignatura/"+rdp.id_assig
                        }
                    })
                })
            }
            callback(err, res);
        });
    }

    getNotesByFromAssig(assigId, aluID, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT n.nota, n.id_assig, a.cod_assig, a.nom_assig "+ 
                  "FROM notes as n, assignatura as a "+
                  "WHERE n.id_alumne = ? AND n.id_assig = a.id_assig AND a.id_assig = ? "+
                  "ORDER BY n.id_assig";
        con.query(sql, [aluID, assigId], function(err, results){
            if(err){
                console.error(err);
            } else{
                var res = []
                results.forEach(rdp=>{
                    res.push({
                        nota: rdp.nota,
                        nom_assig: rdp.nom_assig,
                        id_assig: rdp.id_assig,
                        cod_assig: rdp.cod_assig,
                        links: {
                            get: "GET "+CONNECTION+"/assignatura/"+rdp.id_assig
                        }
                    })
                })
                if(!res.length){
                    err = "L'alumne "+aluID+" NO està matriculat de l'assignatura amb id "+assigId+" o no existeix una assignatura amb eixe ID.";
                }
            }
            callback(err, res);
        })
    }

    getNotesByAssigAndProfeId(assigId, profeId, callback){
        let con = this.mydb.getConnection();
        let sql = "SELECT n.id_alumne, alu.full_name, n.id_assig, assig.cod_assig, n.nota "+
                  "FROM notes as n, assignatura as assig, users as alu "+
                  "WHERE n.id_alumne = alu.id "+
                  "AND n.id_profe = ? "+
                  "AND n.id_assig = ? "+
                  "AND n.id_assig = assig.id_assig "+
                  "ORDER BY n.id_assig";
        con.query(sql, [profeId, assigId], (err, results)=>{
            if(err){
                console.error(err);
            } else {
                var resFinal = []
                results.forEach(res=>{
                    res.links = {
                        assig:"GET "+CONNECTION+"/assignatura/"+res.id_assig,
                        alumne: "GET "+CONNECTION+"/alumne/"+res.id_alumne,
                        nota: "PUT "+CONNECTION+"/moduls/"+res.id_assig+"/"+res.id_alumne
                    }
                    resFinal.push(res)
                })
            }
            callback(err, results)
        })
    }

    setNotesToAlu(assigId, aluId, profeId, nota, callback){
        let con = this.mydb.getConnection();
        let sql = "UPDATE notes SET nota = ? WHERE id_alumne = ? AND id_assig = ? AND id_profe = ?";
        con.query(sql, [nota, aluId, assigId, profeId], (err, results)=>{
            if(err){
                console.error(err);
            }
            callback(err, results);
        })
    }
}