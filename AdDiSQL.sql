create database adsi;

use adsi;

create table if not exists users (
username varchar(255),
password varchar(255),
name varchar(255),
img blob,
primary key (username)
);

CREATE TABLE if not exists students (
  student_username varchar(255),
  enrolled_course varchar(255),
  repeater boolean,
  primary key (student_username),
  foreign key (student_username) references users(username)
);

CREATE TABLE if not exists teachers (
  teacher_username varchar(255),
  department varchar(255),
  primary key(teacher_username),
  foreign key (teacher_username) references users(username)
);

create table if not exists subjects(
id int not null auto_increment,
code varchar(3),
name varchar(255),
weekly_hours int,
module varchar(255),
course varchar(255),
primary key (id)
);

create table if not exists messages (
id int not null auto_increment,
username_teacher varchar(255),
username_student varchar(255),
message varchar(255),
img_route varchar(255),
primary key(id),
foreign key (username_teacher) references teachers(teacher_username),
foreign key (username_student) references students(student_username)
);

create table if not exists teaching (
teacher_username varchar(255),
student_username varchar(255),
id_subject int,
nota double,
primary key(student_username, id_subject),
foreign key(teacher_username) references teachers(teacher_username),
foreign key(student_username) references students(student_username),
foreign key(id_subject) references subjects(id)
);

insert into users (username, password, name) values 
("pepe", "passwd", "Pep Vargas Paredes"),
("enr21", "passwd", "Enrique Poler Perez"),
("jk78", "passwd", "Ivan Morant Martinez"),
("per98", "passwd", "Pere Huertas Mancebo"),
("gillem93", "passwd", "Guillem Fraga Hernandez"),
("luis01", "passwd", "Luis Nares Signes"),
("ab84", "passwd", "Abdo Fraga Huertas"),
("fcnyt", "passwd", "Ferran Cunyat Morant"),
("jgc", "passwd", "Joan Gerard Camarena Estruch");

insert into students values 
("pepe", "2dam", true),
("enr21", "2dam", true),
("jk78", "1dam", false),
("per98", "1asix", false),
("gillem93", "2asix", false),
("luis01", "2dam", true);

insert into teachers values 
("ab84", "Informatica"),
("fcnyt", "Informatica"),
("jgc", "Informatica");

insert into subjects (code, name, weekly_hours, module, course) values 
("PRG", "Programacio", 8, "1", "DAM"),
("PRG", "Programacio", 8, "1", "DAW"),
("LMI", "Llenguatge de marques", 3, "1", "DAM"),
("AD", "Acces a dades", 6, "2", "DAM"),
("DI", "Diseny d'intefaces", 6, "2", "DAM"),
("GBD", "Gestió de bases de dades", 8, "2", "ASIX"),
("SGE", "Sistemes de gestio empresarial", 5, "2", "DAM");

insert into messages (username_teacher, username_student, message, img_route) values
("ab84", "luis01", "Has suspes el examen, no hi ha entrega", "C:\downloads\examens\luis\examen.jpg"),
("fcnyt", "gillem93", "No m'has entregat el ultim exercici", "home/fc/downloads/treballs/guillem/2.5.jpg"),
("jgc", "enr21", "Quan es l'examen Joan? Al moodle posa que está vençut", "C:\screenshots\examen.png");

insert into teaching (teacher_username, student_username, id_subject, nota) values
("ab84", "gillem93", 1, 6.3),
("ab84", "enr21", 2, 6.3),
("fcnyt", "enr21", 3, 6.3),
("fcnyt", "luis01", 3, 6.3),
("jgc", "gillem93", 4, 6.3),
("jgc", "luis01", 1, 6.3),
("jgc", "luis01", 2, 6.3);
