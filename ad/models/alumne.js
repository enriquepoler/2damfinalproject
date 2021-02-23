class Alumne{

    constructor(id_alumne, repetirdor, curs){
        this._id_alumne = id_alumne
        this._repetidor = repetirdor
        this._curs = curs
    };        

    get id_alumne(){
        return this._id_alumne;
    };

    set id_alumne(x){
        this._id_alumne = x;
    };

    get repetirdor(){
        return this._repetidor;
    };

    set repetirdor(x){
        this._repetidor = x;
    };

    get curs(){
        return this._curs;
    };

    set curs(x){
        this._curs = x;
    };

}

module.exports={
    Alumne:Alumne
}