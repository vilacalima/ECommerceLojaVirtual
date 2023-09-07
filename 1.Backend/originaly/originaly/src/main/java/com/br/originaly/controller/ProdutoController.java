package com.br.originaly.controller;

import com.br.originaly.service.ImageService;
import com.br.originaly.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    private ProdutoService _produto;
    private ImageService _image;

    @Autowired
    public ProdutoController(ProdutoService produto, ImageService image){
        _produto = produto;
        _image = image;
    }

//    @Value("${firebase.storageBucket}")
//    private String storageBucket;

    @PostMapping("/image")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {

                System.out.println("Entrou na controller");

                String url = _image.uploadImagem(file);

                return url;
            } catch (IOException e) {
                e.printStackTrace();
                // Trate qualquer erro que possa ocorrer durante o upload
                return "Erro durante o upload da imagem.";
            }
        } else {
            // Lidar com o caso em que nenhum arquivo foi enviado
            return "Nenhum arquivo enviado.";
        }
    }
}
