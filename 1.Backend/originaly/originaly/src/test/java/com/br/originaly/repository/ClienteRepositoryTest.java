package com.br.originaly.repository;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.mockito.Mockito.*;

public class ClienteRepositoryTest {
    @Mock
    IClienteRepository _clienteRepository;
    @Mock
    IEnderecoRepository _enderecoRepository;
    @InjectMocks
    ClienteRepository clienteRepository;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveCliente() throws Exception {
        int result = clienteRepository.saveCliente(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testUpdateCliente() throws Exception {
        boolean result = clienteRepository.updateCliente(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetClientByEmail() throws Exception {
        when(_clienteRepository.findByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));

        Cliente result = clienteRepository.getClientByEmail("email");
        Assertions.assertEquals(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"), result);
    }

    @Test
    public void testGetClientByCpf() throws Exception {
        when(_clienteRepository.findByCpf(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));

        Cliente result = clienteRepository.getClientByCpf("cpf");
        Assertions.assertEquals(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"), result);
    }

    @Test
    public void testSaveEndereco() throws Exception {
        boolean result = clienteRepository.saveEndereco(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetIdClient() throws Exception {
        int result = clienteRepository.getIdClient(0);
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testSaveIsAddressActive() throws Exception {
        boolean result = clienteRepository.saveIsAddressActive(0, true);
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetLogin() throws Exception {
        when(_clienteRepository.getClienteByEmailAndSenha(anyString(), anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));

        String result = clienteRepository.getLogin("email", "senha");
        Assertions.assertEquals("replaceMeWithExpectedResult", result);
    }

    @Test
    public void testGetClientById() throws Exception {
        Cliente result = clienteRepository.getClientById(0);
        Assertions.assertEquals(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"), result);
    }

    @Test
    public void testGetEnderecoByIdCliente() throws Exception {
        when(_enderecoRepository.getEnderecoByIdCliente(anyInt())).thenReturn(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)));

        List<Endereco> result = clienteRepository.getEnderecoByIdCliente(0);
        Assertions.assertEquals(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)), result);
    }

    @Test
    public void testGetEnderecoAndActive() throws Exception {
        when(_enderecoRepository.getEnderecoByIdClienteAndIsEnderecoEntrega(anyInt(), anyBoolean())).thenReturn(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));

        Endereco result = clienteRepository.getEnderecoAndActive(0, true);
        Assertions.assertEquals(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), result);
    }

    @Test
    public void testGetAllEnderecoActive() throws Exception {
        when(_enderecoRepository.getAllEnderecoByIdClienteAndIsEnderecoEntrega(anyInt(), anyBoolean())).thenReturn(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)));

        List<Endereco> result = clienteRepository.getAllEnderecoActive(0, true);
        Assertions.assertEquals(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)), result);
    }

    @Test
    public void testGetEnderecoById() throws Exception {
        Endereco result = clienteRepository.getEnderecoById(0);
        Assertions.assertEquals(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), result);
    }
}