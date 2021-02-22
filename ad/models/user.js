class User{

    _id
    _username
    _password
    _full_name
    _avatar

    constructor(){}

    constructor(username, password, full_name, avatar){
        this._id = id
        this._username = username
        this._password = password
        this._full_name = full_name
        this._avatar = avatar
    };
    
    

    get id(){
        return this._id;
    };

    set id(x){
        this._id = x;
    };

    get username(){
        return this._username;
    };

    set username(x){
        this._username = x;
    };

    get password(){
        return this._password;
    };

    set password(x){
        this._password = x;
    };

    get full_name(){
        return this._full_name;
    };

    set ful_name(x){
        this._full_name = x;
    };

    get avatar(){
        return this._avatar;
    };

    set avatar(x){
        this._avatar = x;
    };

    


}

module.exports={
    User:User
}