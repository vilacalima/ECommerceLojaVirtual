package com.br.originaly.record;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.Endereco;
import com.br.originaly.service.enumerador.OpcaoFrete;
import com.br.originaly.service.enumerador.OpcaoPagamento;
import com.br.originaly.service.enumerador.Situacao;

import java.util.Date;
import java.util.List;

public record PedidoRecord(int id, Date dataCompra, String opPagamento, double total, String frete, String situacaoVenda, double valorFrete, Endereco endereco, List<Carrinho> carrinho) {
}
