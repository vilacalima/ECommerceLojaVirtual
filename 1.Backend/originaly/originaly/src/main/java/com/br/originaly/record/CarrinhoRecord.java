package com.br.originaly.record;

import com.br.originaly.model.Carrinho;

import java.util.List;

public record CarrinhoRecord(String emailCliente,
                             int opcaoPagamento,
                             String opcaoFrete,
                             double valorFrete,
                             int idEndereco) {
}
