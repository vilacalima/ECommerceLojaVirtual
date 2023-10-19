package com.br.originaly.record;

import com.br.originaly.model.Endereco;
import com.br.originaly.service.Sexo;

import java.sql.Date;
import java.util.List;

public record UpdateClienteRecord(String email, String nome, Date dataNasc, String senha) {

}
