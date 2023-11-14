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

    public static String getDescricaoFromOrdinal(int numero) {
        for (OpcaoPagamento meuEnum : values()) {
            if (meuEnum.ordinal() == numero) {
                return meuEnum.descricao;
            }
        }
        return null; // ou lançar uma exceção se o número não for encontrado
    }
}
