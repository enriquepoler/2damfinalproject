module.exports = class User{

    constructor(id, username, password, full_name, avatar){
        this._id = id;
        this._username = username;
        this._password = password;
        this._full_name = full_name;
        this._avatar = avatar;
    }

    get id(){
        return this._id;
    }
    
    set id(id){
        this._id = id;
    }

    get username(){
        return this._username;
    }
    
    set username(username){
        this._username = username;
    }

    get password(){
        return this._password;
    }
    
    set password(password){
        this._password = password;
    }

    get full_name(){
        return this._full_name;
    }
    
    set full_name(full_name){
        this._full_name = full_name;
    }

    get avatar(){
        return this._avatar;
    }
    
    set avatar(avatar){
        this._avatar = avatar;
    }
}