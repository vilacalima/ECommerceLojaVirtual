package com.br.originaly.repository;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.CarrinhoTemporario;
import com.br.originaly.model.Pedido;
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

public class CarrinhoRepositoryTest {
    @Mock
    ICarrinhoRepository _carrinhoRepository;
    @Mock
    IPedidoRepository _pedidoRepository;
    @Mock
    ICarrinhoTemporarioRepository _carrinhoTemporarioRepository;
    @InjectMocks
    CarrinhoRepository carrinhoRepository;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveCarrinho() throws Exception {
        int result = carrinhoRepository.saveCarrinho(List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)), new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 11).getTime(), 0d, 0));
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testSaveCarrinhoTemporario() throws Exception {
        boolean result = carrinhoRepository.saveCarrinhoTemporario(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetCarrinhoTemporario() throws Exception {
        when(_carrinhoTemporarioRepository.getCarrinhoTemporarioByEmailCliente(anyString())).thenReturn(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));

        List<CarrinhoTemporario> result = carrinhoRepository.getCarrinhoTemporario("email");
        Assertions.assertEquals(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)), result);
    }

    @Test
    public void testUpdateEmailCarrinhoTemporario() throws Exception {
        carrinhoRepository.updateEmailCarrinhoTemporario(0, "email");
    }

    @Test
    public void testGetCountCarrinhoTemporario() throws Exception {
        when(_carrinhoTemporarioRepository.countByEmailCliente(anyString())).thenReturn(0L);

        long result = carrinhoRepository.getCountCarrinhoTemporario("emailCliente");
        Assertions.assertEquals(0L, result);
    }

    @Test
    public void testUpdateCarrinhoTemporario() throws Exception {
        carrinhoRepository.updateCarrinhoTemporario(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));
    }

    @Test
    public void testUpdateQuantidadeCarrinhoTemporario() throws Exception {
        carrinhoRepository.updateQuantidadeCarrinhoTemporario(0, 0, 0d, 0d);
    }

    @Test
    public void testGetCarrinhoTemporarioById() throws Exception {
        CarrinhoTemporario result = carrinhoRepository.getCarrinhoTemporarioById(0);
        Assertions.assertEquals(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d), result);
    }

    @Test
    public void testDeleteCarrinhoTemporario() throws Exception {
        when(_carrinhoTemporarioRepository.getCarrinhoTemporarioByEmailCliente(anyString())).thenReturn(List.of(new CarrinhoTemporario(0, 0, "emailCliente", 0, 0d, 0d)));

        carrinhoRepository.deleteCarrinhoTemporario("email");
    }

    @Test
    public void testDeleteCarrinhoTemporario2() throws Exception {
        boolean result = carrinhoRepository.deleteCarrinhoTemporario(0);
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetPedidoByIdCliente() throws Exception {
        when(_pedidoRepository.getAllPedidoByIdCliente(anyInt())).thenReturn(List.of(new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 11).getTime(), 0d, 0)));

        List<Pedido> result = carrinhoRepository.getPedidoByIdCliente(0);
        Assertions.assertEquals(List.of(new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 11).getTime(), 0d, 0)), result);
    }

    @Test
    public void testGetAllCarrinho() throws Exception {
        when(_carrinhoRepository.getAllCarrinhoByIdPedido(anyInt())).thenReturn(List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)));

        List<Carrinho> result = carrinhoRepository.getAllCarrinho(0);
        Assertions.assertEquals(List.of(new Carrinho(0, 0, 0, 0, 0d, 0d)), result);
    }

    @Test
    public void testGetAllPedidoOrderByDate() throws Exception {
        List<Pedido> result = carrinhoRepository.getAllPedidoOrderByDate();
        Assertions.assertEquals(List.of(new Pedido(0, 0, 0, 0d, 0, 0, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 11).getTime(), 0d, 0)), result);
    }

    @Test
    public void testUpdateSituacaoPedido() throws Exception {
        carrinhoRepository.UpdateSituacaoPedido(0, 0);
    }
}