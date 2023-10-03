package com.br.originaly.record;

import com.br.originaly.model.Endereco;

import java.sql.Date;
import java.util.List;

public record ClienteRecord(String nome, String cpf, String email, String telefone, Date dataNasc, int sexo, String senha, List<Endereco> endereco) {
}
