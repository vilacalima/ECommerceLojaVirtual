package com.br.originaly.repository;

import com.br.originaly.model.Usuario;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.mockito.Mockito.*;

public class UsuarioRepositoryTest {
    @Mock
    IUsuarioRepository _usuarioRepository;
    @InjectMocks
    UsuarioRepository usuarioRepository;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllUser() throws Exception {
        List<Usuario> result = usuarioRepository.getAllUser();
        Assertions.assertEquals(List.of(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha")), result);
    }

    @Test
    public void testGetUserById() throws Exception {
        Usuario result = usuarioRepository.getUserById(0);
        Assertions.assertEquals(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"), result);
    }

    @Test
    public void testSave() throws Exception {
        boolean result = usuarioRepository.save(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testUpdate() throws Exception {
        boolean result = usuarioRepository.update(new Usuario(0, "_nome", "_cpf", "_email", true, "_grupo", "_senha"));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testSaveIsActive() throws Exception {
        boolean result = usuarioRepository.saveIsActive(0, true);
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetGroup() throws Exception {
        when(_usuarioRepository.getUserByEmailAndSenha(anyString(), anyString())).thenReturn(new Usuario(0, null, null, null, true, "_grupo", null));

        String result = usuarioRepository.getGroup("email", "senha");
        Assertions.assertEquals("replaceMeWithExpectedResult", result);
    }
}