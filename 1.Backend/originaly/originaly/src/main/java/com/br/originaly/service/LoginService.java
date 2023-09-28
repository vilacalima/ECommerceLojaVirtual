package com.br.originaly.service;

import com.br.originaly.dto.LoginRecord;
import com.br.originaly.repository.UsuarioRepository;
import com.br.originaly.validator.ValidaEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final ValidaEmail _validarEmail;
    private final UsuarioRepository _usuarioRepository;

    @Autowired
    public LoginService(ValidaEmail _validarEmail, UsuarioRepository _usuarioRepository) {
        this._validarEmail = _validarEmail;
        this._usuarioRepository = _usuarioRepository;
    }

    /**
     * Retorna um grupo do banco de dados
     * @param login
     * @return group
     * */
    public String toLogin(LoginRecord login){

        if(_validarEmail.emailValidator(login.email()) == false)
            return "Email invalido";

        String group = _usuarioRepository.getGroup(login.email(), login.senha());

        if(group == null)
            return "Usuário não encontrado";

        return group;
    }
}
