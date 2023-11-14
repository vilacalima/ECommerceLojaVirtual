package com.br.originaly.record;

import com.br.originaly.model.Carrinho;
import com.br.originaly.service.enumerador.OpcaoFrete;
import com.br.originaly.service.enumerador.OpcaoPagamento;
import com.br.originaly.service.enumerador.Situacao;

import java.util.List;

public record PedidoRecord(int id, String opPagamento, double total, String frete, String situacaoVenda, List<Carrinho> carrinho) {
}
