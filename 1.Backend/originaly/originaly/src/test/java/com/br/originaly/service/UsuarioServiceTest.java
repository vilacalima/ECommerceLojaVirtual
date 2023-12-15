package com.br.originaly.service;

import com.br.originaly.model.Usuario;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.repository.UsuarioRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.mockito.Mockito.*;

public class UsuarioServiceTest {
    @Mock
    ValidaCPF _validarCPF;
    @Mock
    ValidaEmail _validarEmail;
    @Mock
    UsuarioRepository _usuarioRepository;
    @Mock
    Cryptography _cryptography;
    @Mock
    MensagemDTO mensagem;
    @InjectMocks
    UsuarioService usuarioService;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testInserirUsuario() throws Exception {
        when(_validarCPF.validarCPF(anyString())).thenReturn(true);
        when(_validarCPF.repleaceCpf(anyString())).thenReturn("repleaceCpfResponse");
        when(_validarEmail.emailValidator(anyString())).thenReturn(true);
        when(_usuarioRepository.save(any())).thenReturn(true);
        when(_cryptography.encryptPassword(anyString())).thenReturn("encryptPasswordResponse");

        MensagemDTO result = usuarioService.inserirUsuario(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testGetUsuario() throws Exception {
        when(_usuarioRepository.getAllUser()).thenReturn(List.of(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha")));

        List<Usuario> result = usuarioService.getUsuario();
        Assertions.assertEquals(List.of(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha")), result);
    }

    @Test
    public void testGetUsuarioById() throws Exception {
        when(_usuarioRepository.getUserById(anyInt())).thenReturn(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"));

        Usuario result = usuarioService.getUsuarioById(0);
        Assertions.assertEquals(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"), result);
    }

    @Test
    public void testUpdateUsuario() throws Exception {
        when(_validarCPF.validarCPF(anyString())).thenReturn(true);
        when(_validarCPF.repleaceCpf(anyString())).thenReturn("repleaceCpfResponse");
        when(_usuarioRepository.update(any())).thenReturn(true);
        when(_cryptography.encryptPassword(anyString())).thenReturn("encryptPasswordResponse");

        MensagemDTO result = usuarioService.updateUsuario(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testIsUserActive() throws Exception {
        when(_usuarioRepository.saveIsActive(anyInt(), anyBoolean())).thenReturn(true);

        MensagemDTO result = usuarioService.isUserActive(0, true);
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }
}