package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import static org.mockito.Mockito.*;

public class ProdutoRepositoryTest {
    @Mock
    IProdutoRepository _produtoRepository;
    @Mock
    IMostruarioRepository _mostruarioRepository;
    @Mock
    Date default_hora_atual;
    @InjectMocks
    ProdutoRepository produtoRepository;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveProduto() throws Exception {
        int result = produtoRepository.saveProduto(new Produto(0, null, null, 0, 0d, true, 0d, null));
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testUpdateProduto() throws Exception {
        boolean result = produtoRepository.updateProduto(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 24).getTime()));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testSaveMonstruario() throws Exception {
        boolean result = produtoRepository.saveMonstruario(new Monstruario(Integer.valueOf(0), "rota", Integer.valueOf(0)));
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testDeleteMonstruarioById() throws Exception {
        produtoRepository.deleteMonstruarioById(0);
    }

    @Test
    public void testGetMonstruarioByRota() throws Exception {
        when(_mostruarioRepository.getMonstruarioByRota(anyString())).thenReturn(new Monstruario(Integer.valueOf(0), "rota", Integer.valueOf(0)));

        int result = produtoRepository.getMonstruarioByRota("rota");
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testUpdateMonstruario() throws Exception {
        boolean result = produtoRepository.updateMonstruario(0, "rota");
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetAllProduct() throws Exception {
        List<Produto> result = produtoRepository.getAllProduct();
        Assertions.assertEquals(List.of(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 24).getTime())), result);
    }

    @Test
    public void testGetAllProductActive() throws Exception {
        List<Produto> result = produtoRepository.getAllProductActive();
        Assertions.assertEquals(List.of(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 24).getTime())), result);
    }

    @Test
    public void testGetIdProduct() throws Exception {
        int result = produtoRepository.getIdProduct(0);
        Assertions.assertEquals(0, result);
    }

    @Test
    public void testGetProductById() throws Exception {
        Produto result = produtoRepository.getProductById(0);
        Assertions.assertEquals(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 17, 24).getTime()), result);
    }

    @Test
    public void testGetUrlImage() throws Exception {
        when(_mostruarioRepository.findListByIdProduto(anyInt())).thenReturn(List.of(new Monstruario(Integer.valueOf(0), "rota", Integer.valueOf(0))));

        List<Monstruario> result = produtoRepository.getUrlImage(0);
        Assertions.assertEquals(List.of(new Monstruario(Integer.valueOf(0), "rota", Integer.valueOf(0))), result);
    }

    @Test
    public void testGetMonstruarioByProductId() throws Exception {
        when(_mostruarioRepository.findListByIdProdutoAndIdOrdem(anyInt(), anyInt())).thenReturn(List.of(new Monstruario(null, "rota", null)));

        List<String> result = produtoRepository.getMonstruarioByProductId(0);
        Assertions.assertEquals(List.of("String"), result);
    }

    @Test
    public void testGetAllMonstruarioByProductId() throws Exception {
        when(_mostruarioRepository.findListByIdProdutoAndIdOrdem(anyInt(), anyInt())).thenReturn(List.of(new Monstruario(null, "rota", null)));
        when(_mostruarioRepository.findByIdProdutoAndIdOrdem(anyInt(), anyInt())).thenReturn(new Monstruario(null, "rota", null));

        List<String> result = produtoRepository.getAllMonstruarioByProductId(0);
        Assertions.assertEquals(List.of("String"), result);
    }

    @Test
    public void testGetIPrimaryFileByProductId() throws Exception {
        when(_mostruarioRepository.findByIdProdutoAndIdOrdem(anyInt(), anyInt())).thenReturn(new Monstruario(null, "rota", null));

        String result = produtoRepository.getIPrimaryFileByProductId(0);
        Assertions.assertEquals("replaceMeWithExpectedResult", result);
    }

    @Test
    public void testSaveIsActive() throws Exception {
        boolean result = produtoRepository.saveIsActive(0, true);
        Assertions.assertEquals(true, result);
    }

    @Test
    public void testGetIdByRota() throws Exception {
        when(_mostruarioRepository.getMonstruarioByRota(anyString())).thenReturn(new Monstruario(Integer.valueOf(0), "rota", Integer.valueOf(0)));

        int result = produtoRepository.getIdByRota("rota");
        Assertions.assertEquals(0, result);
    }
}