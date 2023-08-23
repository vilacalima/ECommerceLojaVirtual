package com.br.originaly.dto;

public class MensagemDTO {

    public String message;
    public boolean isSuccess;

    public MensagemDTO(String message, boolean isSuccess) {
        this.message = message;
        this.isSuccess = isSuccess;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isSuccess() { return isSuccess; }
    public void setSuccess(boolean success) { isSuccess = success; }

}
