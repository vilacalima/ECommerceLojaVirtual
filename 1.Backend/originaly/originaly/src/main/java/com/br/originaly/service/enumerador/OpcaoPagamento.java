package com.br.originaly.service.enumerador;

public enum OpcaoPagamento {
    PIX("PIX"),
    CARTAO("Cartão de crédito");

    private String descricao;
    OpcaoPagamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
