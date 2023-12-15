package com.br.originaly.service;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.record.ClienteRecord;
import com.br.originaly.record.EnderecoRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.UpdateClienteRecord;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import com.br.originaly.validator.ValidaString;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.mockito.Mockito.*;

public class ClienteServiceTest {
    @Mock
    ClienteRepository _clienteRepository;
    @Mock
    Cryptography _cryptography;
    @Mock
    ValidaEmail _validaEmail;
    @Mock
    ValidaCPF _validaCpf;
    @Mock
    ValidaString _validaString;
    @Mock
    CarrinhoService _carrinhoService;
    @Mock
    MensagemDTO mensagemDTO;
    @InjectMocks
    ClienteService clienteService;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveCliente() throws Exception {
        when(_clienteRepository.saveCliente(any())).thenReturn(0);
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getClientByCpf(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.saveEndereco(any())).thenReturn(true);
        when(_cryptography.encryptPassword(anyString())).thenReturn("encryptPasswordResponse");
        when(_validaEmail.emailValidator(anyString())).thenReturn(true);
        when(_validaCpf.validarCPF(anyString())).thenReturn(true);
        when(_validaCpf.repleaceCpf(anyString())).thenReturn("repleaceCpfResponse");
        when(_validaString.validateText(anyString())).thenReturn(true);

        MensagemDTO result = clienteService.saveCliente(new ClienteRecord("nome", "cpf", "email", "telefone", null, Sexo.Masculino, "senha", List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true))));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testUpdateDadosPessoais() throws Exception {
        when(_clienteRepository.updateCliente(any())).thenReturn(true);
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_cryptography.encryptPassword(anyString())).thenReturn("encryptPasswordResponse");
        when(_validaString.validateText(anyString())).thenReturn(true);

        MensagemDTO result = clienteService.updateDadosPessoais(new UpdateClienteRecord("email", "nome", null, "senha"));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testInsertNewEndereco() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.saveEndereco(any())).thenReturn(true);
        when(_clienteRepository.getIdClient(anyInt())).thenReturn(0);

        MensagemDTO result = clienteService.insertNewEndereco("email", List.of(new EnderecoRecord("rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testInactiveClient() throws Exception {
        when(_clienteRepository.saveIsAddressActive(anyInt(), anyBoolean())).thenReturn(true);

        MensagemDTO result = clienteService.inactiveClient(0);
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testVerifyEmail() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));

        boolean result = clienteService.verifyEmail("email");
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetClienteByEmail() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getEnderecoByIdCliente(anyInt())).thenReturn(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)));

        ClienteRecord result = clienteService.getClienteByEmail("email");
        Assertions.assertEquals(new ClienteRecord("nome", "cpf", "email", "telefone", null, Sexo.Masculino, "senha", List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true))), result);
    }

    @Test
    public void testGetEnderecoByIdAndActive() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getEnderecoAndActive(anyInt(), anyBoolean())).thenReturn(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));

        Endereco result = clienteService.getEnderecoByIdAndActive("email");
        Assertions.assertEquals(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), result);
    }

    @Test
    public void testGetAllEnderecoByEmail() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getAllEnderecoActive(anyInt(), anyBoolean())).thenReturn(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)));

        List<Endereco> result = clienteService.getAllEnderecoByEmail("email");
        Assertions.assertEquals(List.of(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true)), result);
    }

    @Test
    public void testGetEnderecoById() throws Exception {
        when(_clienteRepository.getEnderecoById(anyInt())).thenReturn(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));

        Endereco result = clienteService.getEnderecoById(0);
        Assertions.assertEquals(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), result);
    }
}