package com.br.originaly.record;

import com.br.originaly.model.Carrinho;

import java.util.List;

public record PedidoRecord(int id, int opPagamento, double total, int frete, int situacaoVenda, List<Carrinho> carrinho) {
}
