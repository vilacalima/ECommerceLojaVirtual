/*create database originaly;*/
create database originaly;

use originaly;

create table Usuario(
	id int primary key auto_increment not null,
    nome varchar(50) not null,
    cpf varchar(11) not null unique,
    email varchar(70) not null unique,
    ativo boolean not null,
    grupo varchar(10) not null,
    senha varchar(10) not null
);

select * from Usuario;

