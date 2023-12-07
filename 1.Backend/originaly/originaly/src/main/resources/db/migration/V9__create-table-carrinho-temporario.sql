CREATE TABLE carrinho_temporario (
    id SERIAL PRIMARY KEY,
    email_cliente varchar not null,
    id_produto INT not null,
    quantidade INT not null,
    preco_unitario decimal(10, 2) not null,
    preco_total decimal(10, 2) not null
);
