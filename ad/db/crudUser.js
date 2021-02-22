var db = require("./database");

class CrudUser {

    constructor() { }

    insertUser(User) {
        let conn = this.db.getConnection();
        let sql =
            "INSERT INTO users (username, password, full_name, avatar) VALUES (?, ?, ?, ?, ?)";

        conn.query(
            sql,
            [
                User.username,
                User.password,
                User.full_name,
                User.avatar
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
    CrudUser: CrudUser,
};
