package com.br.originaly.service.enumerador;

public enum OpcaoFrete {
    GRANDE_SAO_PAULO("Grande São Paulo"),
    INTERIOR("Interior"),
    DEMAIS_REGIOES("Demais Regiões");

    private String descricao;
    OpcaoFrete(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
