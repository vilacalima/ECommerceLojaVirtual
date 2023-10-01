CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) not null,
    cpf VARCHAR(11) not null unique,
    email VARCHAR(255) not null unique,
    telefone VARCHAR(20) not null,
    data_nasc DATE not null,
    sexo INT not null,
    senha VARCHAR(255) not null
);

CREATE TABLE endereco (
    id SERIAL PRIMARY KEY,
    id_cliente INT,
    rua VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    cep VARCHAR(10),
    is_faturamento BOOLEAN,
    is_endereco_padrao BOOLEAN,
    is_ativo BOOLEAN,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);
