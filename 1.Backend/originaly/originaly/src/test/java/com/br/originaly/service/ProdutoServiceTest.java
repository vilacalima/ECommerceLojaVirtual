package com.br.originaly.service;

import com.br.originaly.model.EnvProdutoDTO;
import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.UpdateProdutoRecord;
import com.br.originaly.repository.ProdutoRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import static org.mockito.Mockito.*;

public class ProdutoServiceTest {
    @Mock
    ProdutoRepository _produtoRepository;
    @Mock
    ImageService _image;
    @Mock
    MensagemDTO mensagem;
    @Mock
    Date default_hora_atual;
    @InjectMocks
    ProdutoService produtoService;

    @Before("")
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testNewProduto() throws Exception {
        when(_produtoRepository.saveProduto(any())).thenReturn(0);
        when(_produtoRepository.saveMonstruario(any())).thenReturn(true);
        when(_image.uploadNewImage(any())).thenReturn("uploadNewImageResponse");

        MensagemDTO result = produtoService.newProduto("nome", "descricao", 0, 0d, true, 0d, null, new MultipartFile[]{null});
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testUpdateProduto() throws Exception {
        when(_produtoRepository.updateProduto(any())).thenReturn(true);
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 16, 58).getTime()));

        MensagemDTO result = produtoService.updateProduto(new UpdateProdutoRecord(0, "nome", "descricao", 0, 0d, true, 0d));
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testUpdateImage() throws Exception {
        when(_produtoRepository.saveMonstruario(any())).thenReturn(true);
        when(_produtoRepository.getMonstruarioByRota(anyString())).thenReturn(0);
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, null, null, 0, 0d, true, 0d, null));
        when(_image.uploadNewImage(any())).thenReturn("uploadNewImageResponse");

        MensagemDTO result = produtoService.updateImage(0, List.of("String"), new MultipartFile[]{null});
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }

    @Test
    public void testGetProductAndImage() throws Exception {
        when(_produtoRepository.getAllProductActive()).thenReturn(List.of(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, null)));
        when(_produtoRepository.getIPrimaryFileByProductId(anyInt())).thenReturn("getIPrimaryFileByProductIdResponse");

        List<EnvProdutoDTO> result = produtoService.getProductAndImage();
        Assertions.assertEquals(List.of(new EnvProdutoDTO(0, "nome", "descricao", 0, 0d, true, 0d, null, "primaryFile")), result);
    }

    @Test
    public void testGetProduct() throws Exception {
        when(_produtoRepository.getAllProduct()).thenReturn(List.of(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 16, 58).getTime())));

        List<Produto> result = produtoService.getProduct();
        Assertions.assertEquals(List.of(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, new GregorianCalendar(2023, Calendar.DECEMBER, 9, 16, 58).getTime())), result);
    }

    @Test
    public void testGetImage() throws Exception {
        when(_produtoRepository.getIdProduct(anyInt())).thenReturn(0);
        when(_produtoRepository.getUrlImage(anyInt())).thenReturn(List.of(new Monstruario(null, "rota", null)));

        List<String> result = produtoService.getImage(0);
        Assertions.assertEquals(List.of("String"), result);
    }

    @Test
    public void testGetProductById() throws Exception {
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, null));
        when(_produtoRepository.getMonstruarioByProductId(anyInt())).thenReturn(List.of("String"));
        when(_produtoRepository.getIPrimaryFileByProductId(anyInt())).thenReturn("getIPrimaryFileByProductIdResponse");

        EnvProdutoDTO result = produtoService.getProductById(0);
        Assertions.assertEquals(new EnvProdutoDTO(0, "nome", "descricao", 0, 0d, true, 0d, List.of("String"), "primaryFile"), result);
    }

    @Test
    public void testGetProductAndAllFileById() throws Exception {
        when(_produtoRepository.getProductById(anyInt())).thenReturn(new Produto(0, "nome", "descricao", 0, 0d, true, 0d, null));
        when(_produtoRepository.getAllMonstruarioByProductId(anyInt())).thenReturn(List.of("String"));
        when(_produtoRepository.getIPrimaryFileByProductId(anyInt())).thenReturn("getIPrimaryFileByProductIdResponse");

        EnvProdutoDTO result = produtoService.getProductAndAllFileById(0);
        Assertions.assertEquals(new EnvProdutoDTO(0, "nome", "descricao", 0, 0d, true, 0d, List.of("String"), "primaryFile"), result);
    }

    @Test
    public void testIsUserActive() throws Exception {
        when(_produtoRepository.saveIsActive(anyInt(), anyBoolean())).thenReturn(true);

        MensagemDTO result = produtoService.isUserActive(0, true);
        Assertions.assertEquals(new MensagemDTO("message", true), result);
    }
}