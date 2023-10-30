package com.br.originaly.record;

import com.br.originaly.model.Carrinho;

import java.util.List;

public record CarrinhoRecord(int idCliente,
                             int opcaoPagamento,
                             int opcaoFrete,
                             List<Carrinho> carrinhoList) {
}
