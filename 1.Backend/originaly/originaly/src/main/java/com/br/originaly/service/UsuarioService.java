package com.br.originaly.service;

import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.model.Usuario;
import com.br.originaly.repository.UsuarioDao;
import com.lojavirtual.senac.validator.ValidaCPF;
import com.lojavirtual.senac.validator.ValidaEmail;
import org.jetbrains.annotations.NotNull;

import java.sql.SQLException;

public class UsuarioService {

    public static MensagemDTO inserirAdministrador(UsuarioDTO dto) throws SQLException {

        MensagemDTO mensagem;

        if(!ValidaCPF.validarCPF(dto.Cpf)){
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }
        if(!ValidaEmail.emailValidator(dto.Email)){
            mensagem = new MensagemDTO("O email é invalido.",false);
            return mensagem;
        }

        if(UsuarioDao.salvar(dto)){
            mensagem = new MensagemDTO("Administrador inserido com Sucesso",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar o novo administrador.",false);
            return mensagem;
        }
    }

    /**
     * Atualiza um Administrador no banco de dados
     * @param request AdministradorDTO
     * */
    public MensagemDTO UpdateAluno(@NotNull UsuarioDTO request) throws SQLException {

        MensagemDTO mensagem;
        if(new ValidaCPF().validarCPF(request.getCpf()) == false) {
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }

        if(new ValidaEmail().emailValidator(request.getEmail()) == false){
            mensagem = new MensagemDTO("O email é invalido.",false);
            return mensagem;
        }

        if(new UsuarioDao().atualizar(request)){
            mensagem = new MensagemDTO("Cadastro do Administrador atualizado com Sucesso",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar aluno.",false);
            return mensagem;
        }
    }

    /**
     * Deleta um Administrador do banco de dados
     * @param cpf String
     * */
    public MensagemDTO DeletarAluno(String cpf) throws SQLException {

        Usuario administrador = new Usuario();

        MensagemDTO mensagem;
        if(administrador.Id != 0){
            new UsuarioDao().excluir(administrador.Id);

            return mensagem = new MensagemDTO("Administrador Deletado com Sucesso",true);
        } else{
            return mensagem = new MensagemDTO("Houve um erro ao deletar o administrador",false);
        }
    }
}
