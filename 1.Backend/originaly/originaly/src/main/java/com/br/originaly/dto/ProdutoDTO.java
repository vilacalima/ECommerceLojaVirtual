package com.br.originaly.dto;

public record ProdutoDTO(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, int idProduto, String rota, int idOrdem) {
}
