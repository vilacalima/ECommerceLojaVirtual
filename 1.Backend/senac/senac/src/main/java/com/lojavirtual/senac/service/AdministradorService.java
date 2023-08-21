package com.lojavirtual.senac.service;

import com.lojavirtual.senac.dto.AdministradorDTO;
import com.lojavirtual.senac.dto.MensagemDTO;
import com.lojavirtual.senac.repository.AdministradorDao;
import com.lojavirtual.senac.validator.ValidaCPF;
import com.lojavirtual.senac.validator.ValidaEmail;

import java.sql.SQLException;

public class AdministradorService {

    public static MensagemDTO inserirAdministrador(AdministradorDTO dto) throws SQLException {

        MensagemDTO mensagem;

        if(!ValidaCPF.validarCPF(dto.Cpf)){
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }
        if(!ValidaEmail.emailValidator(dto.Email)){
            mensagem = new MensagemDTO("O email é invalido.",false);
            return mensagem;
        }

        if(AdministradorDao.salvar(dto)){
            mensagem = new MensagemDTO("Administrador inserido com Sucesso",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar o novo administrador.",false);
            return mensagem;
        }
    }
}
