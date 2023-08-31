/*create database originaly;*/
create database originaly;

use originaly;

create table Administrador(
	id int primary key auto_increment not null,
    nome varchar(50) not null,
    cpf varchar(11) not null,
    email varchar(70) not null,
    telefone varchar(11),
    ativo boolean not null,
    grupo varchar(10) not null
);