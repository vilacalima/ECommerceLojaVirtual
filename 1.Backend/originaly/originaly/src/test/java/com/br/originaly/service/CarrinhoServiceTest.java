package com.br.originaly.service;

import com.br.originaly.model.*;
import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.CarrinhoTemporarioRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.PedidoRecord;
import com.br.originaly.repository.CarrinhoRepository;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.repository.ProdutoRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import static org.mockito.Mockito.*;

public class CarrinhoServiceTest {
    @Mock
    ClienteRepository _clienteRepository;
    @Mock
    ProdutoRepository _produtoRepository;
    @Mock
    CarrinhoRepository _carrinhoRepository;
    @InjectMocks
    CarrinhoService carrinhoService;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getIdClient(anyInt())).thenReturn(0);
        when(_clienteRepository.getClientById(anyInt())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, null, null, 0, 0d, true, 0d, null));
        when(_carrinhoRepository.saveCarrinho(any(), any())).thenReturn(0);
        when(_carrinhoRepository.getCarrinhoTemporario(anyString())).thenReturn(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));

        int result = carrinhoService.save(new CarrinhoRecord("emailCliente", 0, "opcaoFrete", 0d, 0));
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testSaveCarrinhoTemporario() throws Exception {
        when(_carrinhoRepository.saveCarrinhoTemporario(any())).thenReturn(true);

        MensagemDTO result = carrinhoService.saveCarrinhoTemporario(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testGetAllCarrinhoTemporario() throws Exception {
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, "nome", null, 0, 0d, true, 0d, null));
        when(_carrinhoRepository.getCarrinhoTemporario(anyString())).thenReturn(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));

        List<CarrinhoTemporarioRecord> result = carrinhoService.getAllCarrinhoTemporario("email");
        Assertions.assertEquals(List.of(new CarrinhoTemporarioRecord(0, "emailCliente", 0, "nomeProduto", 0, 0d, 0d)), result);
    }

    @Test
    public void testGetAllPedido() throws Exception {
        when(_clienteRepository.getClientByEmail(anyString())).thenReturn(new Cliente(0, "nome", "cpf", "email", "telefone", null, 0, "senha"));
        when(_clienteRepository.getEnderecoById(anyInt())).thenReturn(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));
        when(_carrinhoRepository.getPedidoByIdCliente(anyInt())).thenReturn(List.of(new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 5).getTime(), 0d, 0)));
        when(_carrinhoRepository.getAllCarrinho(anyInt())).thenReturn(List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)));

        List<PedidoRecord> result = carrinhoService.getAllPedido("email");
        Assertions.assertEquals(List.of(new PedidoRecord(0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 5).getTime(), "opPagamento", 0d, "frete", "situacaoVenda", 0d, new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)))), result);
    }

    @Test
    public void testGetCount() throws Exception {
        when(_carrinhoRepository.getCountCarrinhoTemporario(anyString())).thenReturn(0L);

        long result = carrinhoService.getCount("email");
        Assertions.assertEquals(0L, result);
    }

    @Test
    public void testUpdateCarrinhoTemporario() throws Exception {
        MensagemDTO result = carrinhoService.updateCarrinhoTemporario(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testUpdateQuantidadeCarrinhoTemporario() throws Exception {
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, null, null, 0, 0d, true, 0d, null));
        when(_carrinhoRepository.getCarrinhoTemporarioById(anyInt())).thenReturn(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d));

        MensagemDTO result = carrinhoService.updateQuantidadeCarrinhoTemporario(0, 0);
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testDeleteItemCarrinhoTemporario() throws Exception {
        when(_carrinhoRepository.deleteCarrinhoTemporario(anyInt())).thenReturn(true);

        MensagemDTO result = carrinhoService.deleteItemCarrinhoTemporario(0);
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testGetAllPedidosOrderByData() throws Exception {
        when(_clienteRepository.getEnderecoById(anyInt())).thenReturn(new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true));
        when(_carrinhoRepository.getAllCarrinho(anyInt())).thenReturn(List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)));
        when(_carrinhoRepository.getAllPedidoOrderByDate()).thenReturn(List.of(new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 5).getTime(), 0d, 0)));

        List<PedidoRecord> result = carrinhoService.getAllPedidosOrderByData();
        Assertions.assertEquals(List.of(new PedidoRecord(0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 5).getTime(), "opPagamento", 0d, "frete", "situacaoVenda", 0d, new Endereco(0, 0, "rua", "numero", "complemento", "bairro", "cidade", "cep", true, true, true, true), List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)))), result);
    }

    @Test
    public void testUpdateSituacaoPedido() throws Exception {
        MensagemDTO result = carrinhoService.updateSituacaoPedido(0, "opSituacao");
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testUpdateCarrinhoTemporario2() throws Exception {
        when(_carrinhoRepository.getCarrinhoTemporario(anyString())).thenReturn(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));

        carrinhoService.updateCarrinhoTemporario("email");
    }
}