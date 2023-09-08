package com.br.originaly.controller;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.ProdutoDTO;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import com.br.originaly.service.ImageService;
import com.br.originaly.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/product")
public class ProdutoController {

    private ProdutoService _produto;
    private ImageService _image;

    @Autowired
    public ProdutoController(ProdutoService produto, ImageService image){
        _produto = produto;
        _image = image;
    }

    @PostMapping("/newProduct")
    public MensagemDTO novoProduto(@RequestParam("file") MultipartFile file,
                                   @RequestParam String nome,
                                   @RequestParam String descricao,
                                   @RequestParam int quantidade,
                                   @RequestParam double valor,
                                   @RequestParam boolean ativo,
                                   @RequestParam double avaliacao) {
        MensagemDTO message;
        if (!file.isEmpty()) {
            try {

                message = _produto.newProduto(nome, descricao, quantidade, valor, ativo, avaliacao, file);
                return message;

            } catch (IOException e) {
                e.printStackTrace();
                return new MensagemDTO("Erro durante o upload da imagem: " + e.getMessage().toString(), false);
            }
        } else {
            return new MensagemDTO("Nenhum arquivo enviado", false);
        }
    }

    @GetMapping("/getAllProduct")
    public List<Produto> getUsuario(){
        return _produto.getProduct();
    }

    @GetMapping("/getImage")
    public String getImage(@RequestParam int id){
        return _produto.getImage(id);
    }
}
