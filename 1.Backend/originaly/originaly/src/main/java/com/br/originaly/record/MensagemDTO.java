package com.br.originaly.record;

import lombok.Data;

@Data
public class MensagemDTO {

    public String message;
    public boolean isSuccess;

    /**
     * Retorna mensagem para o usuário
     * @param message
     * @param isSuccess
     * */
    public MensagemDTO(String message, boolean isSuccess) {
        this.message = message;
        this.isSuccess = isSuccess;
    }
}
