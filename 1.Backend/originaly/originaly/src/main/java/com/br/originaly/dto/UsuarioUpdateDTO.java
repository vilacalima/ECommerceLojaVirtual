package com.br.originaly.dto;

public record UsuarioUpdateDTO(int id, String nome, String cpf, String email, boolean ativo, String grupo, String senha) {
}
