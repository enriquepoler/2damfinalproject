var DB = require("./database");

class CrudUser {

    constructor() { }

    static insertUser(User, callback) {
        let mydb = new DB.Database()
        let conn = mydb.getConnection()
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

                callback(err, results)
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
