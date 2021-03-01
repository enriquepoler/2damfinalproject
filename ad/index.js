const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const Alumne = require('./models/alumne')
const Professor = require('./models/professor')
const User = require('./models/user')
const CrudUser = require('./db/crudUser')
const CrudProfessor = require('./db/crudProfessor')
const crudAlumne = require('./db/crudAlumne')
const { CrudAlumne } = require('./db/crudAlumne')
const port = 8090
const accessTokenSecret = 'paraulasupersecreta'
const refreshTokenSecret = 'laMateixaDeSempre'
const refreshTokens = []

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
        const token = authHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            // afegim a la petició les dades que venien en el jwt user
            req.user = user
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next()
        })
    } else { // no està. contestem directament al client amb un error 401(unauthorized)
        res.sendStatus(401)
    }
}

let app = express()

app.use(bodyParser.json())

app.listen(port , () => {
    console.log('Authentication service started on port ' + port)
})

// 1. Rebre les dades i comprovar que els camps obligatories existeixen.
// 2. Comprovar que el username no està donat d’alta a la taula d’usuaris.
// 3. Verificar que el dni està o no a la taula de DNI_PROFES
// 4. Inserir en la taula de users.
// 5. Inserir en la taula de alumne o professor, depenent del resultat de l’apartat 3
// 6. Retornar la informació al client. Aquesta informació deu empaquetar-se en un JWT, i en l’apartat
// del payload contindrà com a dades:
//{
//    "user_id": 23,
//    "username": "pepitou",
//    "role": "profe",
//    "iat": 1613503548,
//    "exp": 1613589948
//}

app.post('/register', (req, res) => {
    if (req.body.username != "" & req.body.password != "" & req.body.full_name != "" & req.body.dni != "") {

        let user = new User.User(
            req.body.username,
            req.body.password,
            req.body.full_name,
            req.body.avatar
        )

        CrudUser.usernameExists(user, (err, rs) =>{
            if(err){
                res.status(400)
                    .send({
                        ok: false,
                        error: "Error añadiendo usuario: " + err
                    })
            }else{
                if(rs.usernameExists == 1){
                    res.status(400)
                    .send({
                        ok: false,
                        error: "El nombre de usuario ya existe"
                    })
                }else if(rs.usernameExists == 0){
                    CrudUser.insertUser(user, (error, resultado) => {
                        if (error) {
                            res.status(400)
                                .send({
                                    ok: false,
                                    error: "Error añadiendo usuario: " + error
                                })
                        } else {        
                            CrudProfessor.isProfessor(req.body.dni, (erri, result) => {
                                if(erri){
                                    res.status(400).send({
                                        ok: false,
                                        error: erri
                                    })
                                }else{
                                    CrudUser.getUserID(user, (erru, resID) =>{
                                        if(erru){
                                            res.status(400).send({
                                                ok: false,
                                                error: erru
                                            })
                                        }else{
                                            if(result.isProfe == 1){
                                                CrudProfessor.insertProfessor(resID.id, (erra, reslt)  =>{
                                                    if(erra){
                                                        res.status(400).send({
                                                            ok: false,
                                                            error: erra
                                                        })
                                                    }else{
                                                        // Generarem el token
                                                        const accessToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "professor"
                                                        }, accessTokenSecret, {expiresIn: '20m'})                                                        

                                                        const refreshToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "professor"
                                                        }, refreshTokenSecret)

                                                        refreshTokens.push(refreshToken)

                                                        res.status(200).send({
                                                            ok: true,
                                                            data:{
                                                                token: accessToken,
                                                                refreshToken: refreshToken,
                                                                avatar: ""
                                                            }                                                            
                                                        })
                                                    }
                                                })
                                            }else if(result.isProfe == 0){
                                                CrudAlumne.insertAlumne(resID.id, (errorA, resltado) =>{
                                                    if(errorA){
                                                        res.status(400).send({
                                                            ok: false,
                                                            error: errorA
                                                        })
                                                    }else{
                                                        // Generarem el token
                                                        const accessToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "alumne"
                                                        }, accessTokenSecret, {expiresIn: '2h'})                                                        

                                                        const refreshToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "alumne"
                                                        }, refreshTokenSecret)

                                                        refreshTokens.push(refreshToken)

                                                        res.status(200).send({
                                                            ok: true,
                                                            data:{
                                                                token: accessToken,
                                                                refreshToken: refreshToken,
                                                                avatar: ""
                                                            }
                                                        })
                                                    }
                                                })
                                            }    
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
        
    }else{
        res.status(403).send({
            ok: false,
            error: "Error, los campos no son validos"
        })
    }
})

app.post('/login', (req, res) => {
    if (req.body.username != "" & req.body.password != "") {
        let user = new User.User(
            req.body.username,
            req.body.password
        )
        CrudUser.login(user, (err, resu) => {
            if(err){
                res.status(403).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resu != null){
                    CrudProfessor.isProfessorByID(resu.id, (erro, result) => {
                        if(erro){
                            res.status(400).send({
                                ok: false,
                                error: erro
                            })
                        }else{
                            var rolUser = null
                            if(result.isProfe == 1){                            
                                rolUser = "professor"
                            }else if(result.isProfe == 0){
                                rolUser = "alumne"
                            }

                            // Generarem el token
                            const accessToken = jwt.sign({ 
                                user_id: resu.id,
                                username: user.username,
                                role: rolUser
                            }, accessTokenSecret, {expiresIn: '2h'})                                                        

                            const refreshToken = jwt.sign({ 
                                user_id: resu.id,
                                username: user.username,
                                role: rolUser
                            }, refreshTokenSecret)

                            refreshTokens.push(refreshToken)

                            res.status(200).send({
                                ok: true,
                                data:{
                                    token: accessToken,
                                    refreshToken: refreshToken,
                                    avatar: {
                                        type: "Buffer",
                                        data: []
                                    }
                                }
                            })
                        }
                    })
                }else{
                    res.status(401).send({
                        ok: false,
                        error: "Error, l'usuario i/o la contrasenya no son correctes"
                    })
                }
                
            }
        })
    }else{
        res.status(403).send({
            ok: false,
            error: "Error, los campos no son validos"
        })
    }
})

app.get('/notes', authenticateJWT, (req, res) => {
    if(req.user.role == "alumne"){
        crudAlumne.askNotesAlumneByID(req.user.user_id, (err, resArrayNotes) => {
            if(err){
                res.status(400).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resArrayNotes != null){
                    res.status(200).send({
                        ok: true,
                        data: resArrayNotes
                    })
                }else{
                    res.status(400).send({
                        ok: false,
                        error: "El alumne no está matriculat de ninguna assignatura"
                    })
                }
                
            }
        })
    }else{
        res.status(401).send({
            ok: false,
            error: "Error, no eres un alumne"
        })
    }
})

app.get('/notes/:id', authenticateJWT, (req, res) => {
    if(req.user.role == "alumne"){
        crudAlumne.askNotaAlumneByID(req.user.user_id, req.params.id, (err, resJsonNotes) => {
            if(err){
                res.status(400).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resJsonNotes != null){
                    res.status(200).send({
                        ok: true,
                        data: resJsonNotes
                    })
                }else{
                    res.status(400).send({
                        ok: false,
                        error: "El alumne no está matriculat d'aquesta assignatura"
                    })
                }
                
            }
        })
    }else{
        res.status(401).send({
            ok: false,
            error: "Error, no eres un alumne"
        })
    }
})

app.get('/assignatura/:id_assignatura', authenticateJWT, (req, res) => {
    CrudUser.askAssigByID(req.params.id_assignatura, (err, resJsonAssig) => {
        if(err){
            res.status(400).send({
                ok: false,
                error: err
            })
        }else{
            if(resJsonAssig != null){
                res.status(200).send({
                    ok: true,
                    data: resJsonAssig
                })
            }else{
                res.status(400).send({
                    ok: false,
                    error: "No existeix ninguna assignatura amb eixe identificador"
                })
            }
            
        }
    })
})

app.get('/moduls', authenticateJWT, (req, res) => {
    if(req.user.role == "professor"){
        CrudProfessor.askModuls(req.user.user_id, (err, resArrayModuls) => {
            if(err){
                res.status(400).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resArrayModuls != null){
                    res.status(200).send({
                        ok: true,
                        data: resArrayModuls
                    })
                }else{
                    res.status(400).send({
                        ok: false,
                        error: "El professor no imparteix ningun modul"
                    })
                }
                
            }
        })
    }else{
        res.status(401).send({
            ok: false,
            error: "Error, no eres un professor"
        })
    }
})

app.get('/moduls/:id_assignatura', authenticateJWT, (req, res) => {
    if(req.user.role == "professor"){
        CrudProfessor.askModuls(req.user.user_id, req.params.id_assignatura, (err, resArrayModulAssig) => {
            if(err){
                res.status(400).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resArrayModulAssig != null){
                    res.status(200).send({
                        ok: true,
                        data: resArrayModulAssig
                    })
                }else{
                    res.status(400).send({
                        ok: false,
                        error: "El professor no imparteix aquest modul o no hi han alumnes matriculats de l'assignatura"
                    })
                }
                
            }
        })
    }else{
        res.status(401).send({
            ok: false,
            error: "Error, no eres un professor"
        })
    }
})

app.put('/moduls/:id_assignatura/:id_alumne', authenticateJWT, (req, res) => {
    if(req.user.role == "professor"){
        CrudProfessor.setNotaByIdAssigAndIdAlu(req.user.user_id, req.params.id_assignatura, req.params.id_alumne, req.body.nota, (err, resPutNota) => {
            if(err){
                res.status(400).send({
                    ok: false,
                    error: err
                })
            }else{
                if(resPutNota != null){
                    res.status(200).send({
                        ok: true
                    })
                }else{
                    res.status(400).send({
                        ok: false,
                        error: "El professor no imparteix aquest modul/no existeix el modul o no hi han alumnes matriculats de l'assignatura"
                    })
                }
                
            }
        })
    }else{
        res.status(401).send({
            ok: false,
            error: "Error, no eres un professor"
        })
    }
})