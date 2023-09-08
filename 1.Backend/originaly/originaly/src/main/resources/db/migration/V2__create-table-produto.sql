CREATE TABLE Produto(
    id SERIAL primary key,
    nome varchar(200) not null,
    descricao varchar(2000) not null,
    quantidade int not null,
    valor decimal(10, 2) not null,
    ativo boolean not null,
    avaliacao decimal(1,1)
);

CREATE TABLE Monstruario(
    id SERIAL primary key,
    id_produto int not null,
    rota varchar(200) not null,
    id_ordem int not null,
    FOREIGN KEY (id_produto) REFERENCES Produto(id)
);