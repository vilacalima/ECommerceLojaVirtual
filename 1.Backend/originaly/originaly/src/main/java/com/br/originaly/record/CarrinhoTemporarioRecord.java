package com.br.originaly.record;

public record CarrinhoTemporarioRecord(int id,
                                       String emailCliente,
                                       int idProduto,
                                       String nomeProduto,
                                       int quantidade,
                                       double precoUnitario,
                                       double precoTotal) {
}
