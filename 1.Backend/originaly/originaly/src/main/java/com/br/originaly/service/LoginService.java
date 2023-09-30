package com.br.originaly.service;

import com.br.originaly.dto.LoginRecord;
import com.br.originaly.repository.UsuarioRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final ValidaEmail _validarEmail;
    private final UsuarioRepository _usuarioRepository;
    private final Cryptography _cryptography;

    @Autowired
    public LoginService(ValidaEmail _validarEmail, UsuarioRepository _usuarioRepository, Cryptography cryptography) {
        this._validarEmail = _validarEmail;
        this._usuarioRepository = _usuarioRepository;
        _cryptography = cryptography;

    }

    /**
     * Retorna um grupo do banco de dados
     * @param login
     * @return group
     * */
    public String toLogin(LoginRecord login){

        if(_validarEmail.emailValidator(login.email()) == false)
            return "Email invalido";

        String senha = _cryptography.encryptPassword(login.senha());
        String group = _usuarioRepository.getGroup(login.email(), senha);

        if(group == null)
            return "Usuário não encontrado";

        return group;
    }
}
