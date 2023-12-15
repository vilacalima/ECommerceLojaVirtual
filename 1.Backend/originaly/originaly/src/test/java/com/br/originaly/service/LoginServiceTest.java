package com.br.originaly.service;

import com.br.originaly.record.LoginRecord;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.repository.UsuarioRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaEmail;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

public class LoginServiceTest {
    @Mock
    ValidaEmail _validarEmail;
    @Mock
    UsuarioRepository _usuarioRepository;
    @Mock
    ClienteRepository _clienteRepository;
    @Mock
    Cryptography _cryptography;
    @Mock
    CarrinhoService _carrinhoService;
    @InjectMocks
    LoginService loginService;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testToLogin() throws Exception {
        when(_validarEmail.emailValidator(anyString())).thenReturn(true);
        when(_usuarioRepository.getGroup(anyString(), anyString())).thenReturn("getGroupResponse");
        when(_clienteRepository.getLogin(anyString(), anyString())).thenReturn("getLoginResponse");
        when(_cryptography.encryptPassword(anyString())).thenReturn("encryptPasswordResponse");

        String result = loginService.toLogin(new LoginRecord("email", "senha"));
        Assertions.assertEquals("replaceMeWithExpectedResult", result);
    }
}