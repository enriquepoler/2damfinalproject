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
const refreshTokens = [];

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
        const token = authHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // afegim a la petició les dades que venien en el jwt user
            req.user = user;
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next()
        })
    } else { // no està. contestem directament al client amb un error 401(unauthorized)
        res.sendStatus(401);
    }
}

function authenticateProfe(req, res, next){
    if(req.user.role == 'profe'){
        next()
    } else {
        return res.sendStatus(401)
    }
}

function authenticateAlu(req, res, next){
    if(req.user.role == 'alumne'){
        next()
    } else {
        return res.sendStatus(401) 
    }
}

let app = express();

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
                            CrudProfessor.isProfessor(req.body.dni, (err, result) => {
                                if(err){
                                    res.status(400).send({
                                        ok: false,
                                        error: err
                                    })
                                }else{
                                    CrudUser.getUserID(user, (err, resID) =>{
                                        if(err){
                                            res.status(400).send({
                                                ok: false,
                                                error: err
                                            })
                                        }else{
                                            if(result.isProfe == 1){
                                                CrudProfessor.insertProfessor(resID.id, (err, reslt)  =>{
                                                    if(err){
                                                        res.status(400).send({
                                                            ok: false,
                                                            error: err
                                                        })
                                                    }else{
                                                        // Generarem el token
                                                        const accessToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "profe"
                                                        }, accessTokenSecret, {expiresIn: '20m'});                                                        

                                                        const refreshToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "profe"
                                                        }, refreshTokenSecret);

                                                        refreshTokens.push(refreshToken);

                                                        res.status(200).json({
                                                            accessToken,
                                                            refreshToken
                                                        }).send({
                                                            ok: true,
                                                            resultado: reslt
                                                        })
                                                    }
                                                })
                                            }else if(result.isProfe == 0){
                                                CrudAlumne.insertAlumne(resID.id, (error, resltado) =>{
                                                    if(error){
                                                        res.status(400).send({
                                                            ok: false,
                                                            error: error
                                                        })
                                                    }else{
                                                        // Generarem el token
                                                        const accessToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "alumne"
                                                        }, accessTokenSecret, {expiresIn: '2h'});                                                        

                                                        const refreshToken = jwt.sign({ 
                                                            user_id: resID.id,
                                                            username: user.username,
                                                            role: "alumne"
                                                        }, refreshTokenSecret);

                                                        refreshTokens.push(refreshToken);

                                                        res.status(200).json({
                                                            accessToken,
                                                            refreshToken
                                                        }).send({
                                                            ok: true,
                                                            data:{
                                                                "token": accessToken,
                                                                "refreshToken": refreshToken,
                                                                "avatar": ""
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
                CrudUser.getUserID(user, (err, resID) =>{
                    if(err){
                        res.status(400).send({
                            ok: false,
                            error: err
                        })
                    }else{
                        CrudProfessor.isProfessorByID(resID.id, (err, result) => {
                            if(err){
                                res.status(400).send({
                                    ok: false,
                                    error: err
                                })
                            }else{
                                if(result.isProfe == 1){
                                    // Generarem el token
                                    const accessToken = jwt.sign({ 
                                        user_id: resID.id,
                                        username: user.username,
                                        role: "profe"
                                    }, accessTokenSecret, {expiresIn: '2h'});                                                        
        
                                    const refreshToken = jwt.sign({ 
                                        user_id: resID.id,
                                        username: user.username,
                                        role: "profe"
                                    }, refreshTokenSecret);
        
                                    refreshTokens.push(refreshToken);
        
                                    res.status(200).json({
                                        accessToken,
                                        refreshToken
                                    }).send({
                                        ok: true,
                                        data:{
                                            "token": accessToken,
                                            "refreshToken": refreshToken,
                                            "avatar": {
                                                "type": "Buffer",
                                                "data": []
                                            }
                                        }
                                    })
                                }else if(result.isProfe == 0){
                                    // Generarem el token
                                    const accessToken = jwt.sign({ 
                                        user_id: resID.id,
                                        username: user.username,
                                        role: "alumne"
                                    }, accessTokenSecret, {expiresIn: '2h'});                                                        
        
                                    const refreshToken = jwt.sign({ 
                                        user_id: resID.id,
                                        username: user.username,
                                        role: "alumne"
                                    }, refreshTokenSecret);
        
                                    refreshTokens.push(refreshToken);
        
                                    res.status(200).json({
                                        accessToken,
                                        refreshToken
                                    }).send({
                                        ok: true,
                                        data:{
                                            "token": accessToken,
                                            "refreshToken": refreshToken,
                                            "avatar": {
                                                "type": "Buffer",
                                                "data": []
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    }else{
        res.status(403).send({
            ok: false,
            error: "Error, los campos no son validos"
        })
    }
})