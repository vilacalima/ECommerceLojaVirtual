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

    public static String getDescricaoFromOrdinal(int numero) {
        for (Situacao meuEnum : values()) {
            if (meuEnum.ordinal() == numero) {
                return meuEnum.descricao;
            }
        }
        return null; // ou lançar uma exceção se o número não for encontrado
    }

    public static int getDescricaoFromDescricao(String opcao) {
        for (Situacao meuEnum : values()) {
            if (meuEnum.getDescricao().equals(opcao)) {
                return meuEnum.ordinal();
            }
        }
        return 00; // ou lançar uma exceção se o número não for encontrado
    }
}
