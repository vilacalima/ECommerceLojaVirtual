CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    id_cliente INT not null,
    opcao_pagamento INT not null,
    subtotal decimal(10, 2) not null,
    opcao_frete INT not null,
    situacao INT not null,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE carrinho (
    id SERIAL PRIMARY KEY,
    id_pedido INT not null,
    id_produto INT not null,
    quantidade INT not null,
    preco_unitario decimal(10, 2) not null,
    preco_total decimal(10, 2) not null,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);