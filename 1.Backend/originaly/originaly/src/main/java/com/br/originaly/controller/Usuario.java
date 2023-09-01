package com.br.originaly.controller;

public record Usuario(String nome, String cpf, String email, boolean ativo, String grupo, String senha) {
}
