package com.br.originaly.record;

import com.br.originaly.model.Endereco;
import com.br.originaly.service.Sexo;

import java.sql.Date;
import java.util.List;

public record ClienteRecord(String nome, String cpf, String email, String telefone, Date dataNasc, Sexo sexo, String senha, List<Endereco> enderecos) {
}
