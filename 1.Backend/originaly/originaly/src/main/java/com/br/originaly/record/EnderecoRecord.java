package com.br.originaly.record;

public record EnderecoRecord(String rua, String numero, String complemento, String bairro, String cidade, String cep, boolean isFaturamento, boolean isEnderecoPadrao, boolean isEnderecoEntrega, boolean isAtivo) {
}
