class Professor{

    _id_professor
    _departament

    constructor(){}

    constructor(id_professor, departament){
        this._id_professor = id_professor
        this._departament = departament
    };        

    get id_professor(){
        return this._id_professor;
    };

    set id_professor(x){
        this._id_professor = x;
    };

    get departament(){
        return this._departament;
    };

    set departament(x){
        this._departament = x;
    };

}

module.exports={
    Professor:Professor
}