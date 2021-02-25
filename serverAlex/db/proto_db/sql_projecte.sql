drop database if exists projecte_sql_alex_vidal;
create database projecte_sql_alex_vidal;
use projecte_sql_alex_vidal;

create table usuaris(
	nick varchar(15) primary key,
    password varchar(30),
    nom_complet varchar(30),
    avatar blob
);

insert into usuaris(nick) values
("alevid"),
("joange"),
("joamuran"),
("mooody"),
("enrique"),
("gowet");

create table professors(
	nick varchar(15) primary key,
    departament varchar(15),
    CONSTRAINT nick_professor_fk
    FOREIGN KEY (nick)
    REFERENCES usuaris(nick)
); 

insert into professors values
("joange", "Informàtica"),
("joamuran", "Informàtica");

create table alumnes(
	nick varchar(15) primary key,
    curs varchar(10),
    repetidor boolean,
    CONSTRAINT nick_alumne_fk
    FOREIGN KEY (nick)
    REFERENCES usuaris(nick)
);

insert into alumnes values
("alevid", 2, false),
("mooody", 2, false),
("enrique", 1, false),
("gowet", 2, true);

create table assignatures(
	id int primary key auto_increment,
	codi varchar(3),
    nom varchar(40),
    hores_setmanals int,
    modul varchar(10),
    curs int
);

insert into assignatures(codi, nom, hores_setmanals, modul, curs) values
("PRG", "Programació", 10, "DAM", 1),
("LMI", "Lleng. marques", 4, "DAM", 1),
("LMI", "Lleng. marques", 4, "ASIX", 1),
("AD", "Accés a dades", 4, "DAM", 2);

create table docencia(
	alumne varchar(15),
    professor varchar(15),
    assignatura int,
    nota int,
    CONSTRAINT alumne_docencia_fk
    FOREIGN KEY (alumne)
    REFERENCES alumnes(nick),
    
    CONSTRAINT professor_docencia_fk
    FOREIGN KEY (professor)
    REFERENCES professors(nick),
    
    CONSTRAINT assignatura_fk
    FOREIGN KEY (assignatura)
    REFERENCES assignatures(id),
    primary key(alumne, assignatura)
);

insert into docencia values
("alevid", "joange", 4, 10),
("mooody", "joange", 4, 5),
("alevid", "joange", 1, 10),
("gowet", "joamuran", 4, 9);


create table missatgeria(
	id int primary key auto_increment,
    alumne varchar(15),
    professor varchar(15),
	missatge varchar(1000),
    imatge varchar(40),
    
	CONSTRAINT alumne_missatgeria_fk
    FOREIGN KEY (alumne)
    REFERENCES alumnes(nick),
    CONSTRAINT professor_missatgeria_fk
    FOREIGN KEY (professor)
    REFERENCES professors(nick)
);




