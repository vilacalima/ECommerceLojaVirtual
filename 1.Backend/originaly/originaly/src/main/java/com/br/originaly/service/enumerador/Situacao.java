package com.br.originaly.service.enumerador;

public enum Situacao {
    AGUARDANDO_PAGAMENTO("Aguardando Pagamento"),
    PAGAMENTO_REJEITADO("Pagamento Rejeitado"),
    PAGAMENTO_COM_SUCESSO("Pagamento com Sucesso"),
    AGUARDANDO_RETIRADA("Aguardando Retirada"),
    EM_TRANSITO("Em trânsito"),
    ENTREGUE("Entregue");

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
        return 00;
    }
}
