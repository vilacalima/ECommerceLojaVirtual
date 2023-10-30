package com.br.originaly.service.enumerador;

public enum Situacao {
    CADASTRADO("Cadastrado"),
    FINALIZADO("Finalizado"),
    CANCELADO("Cancelado");

    private String descricao;
    Situacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}
