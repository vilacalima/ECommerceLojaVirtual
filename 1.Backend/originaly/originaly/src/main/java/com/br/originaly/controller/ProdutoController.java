package com.br.originaly.controller;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.UpdateProdutoRecord;
import com.br.originaly.model.EnvProdutoDTO;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import com.br.originaly.service.ImageService;
import com.br.originaly.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

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
    public MensagemDTO novoProduto(@RequestParam String nome,
                                   @RequestParam String descricao,
                                   @RequestParam int quantidade,
                                   @RequestParam double valor,
                                   @RequestParam boolean ativo,
                                   @RequestParam double avaliacao,
                                   @RequestParam("filePrimary") MultipartFile filePrimary,
                                   @RequestParam("file") MultipartFile[] file) {
        MensagemDTO message;

        try {

            message = _produto.newProduto(nome, descricao, quantidade, valor, ativo, avaliacao, filePrimary, file);
            return message;

        } catch (IOException e) {
            e.printStackTrace();
            return new MensagemDTO("Erro durante o upload da imagem: " + e.getMessage().toString(), false);
        }
    }

    @PutMapping("/updateProduct")
    public MensagemDTO atualizarProduto(@RequestBody UpdateProdutoRecord product) {
        MensagemDTO message;

        try {

            message = _produto.updateProduto(product);
            return message;

        } catch (IOException e) {
            e.printStackTrace();
            return new MensagemDTO("Erro durante o upload da imagem: " + e.getMessage().toString(), false);
        }

    }

    @GetMapping("/getAllProduct")
    public List<Produto> getAllProduct(){
        return _produto.getProduct();
    }

    @GetMapping("/getAllProductAndImage")
    public List<EnvProdutoDTO> getAllProductAndImage(){
        return _produto.getProductAndImage();
    }

    @GetMapping("/getProductById/{id}")
    public EnvProdutoDTO getProductById(@PathVariable int id){
        return _produto.getProductById(id);
    }

    @GetMapping("/getProductAndAllFileById/{id}")
    public EnvProdutoDTO getProductAndAllFileById(@PathVariable int id){
        return _produto.getProductAndAllFileById(id);
    }

    @GetMapping("/getImage")
    public String getImage(@RequestParam int id){
        return _produto.getImage(id);
    }

    @GetMapping("/getImagee")
    public void getImagee() throws IOException {
        _image.downloadObjectIntoMemory();
    }


    @PutMapping("/produtoAtivo/{id}/{isActive}")
    public MensagemDTO produtoAtivo(@PathVariable int id, @PathVariable boolean isActive){
        MensagemDTO mensagem = null;

        try{
            mensagem = _produto.isUserActive(id, isActive);

        } catch (Exception e){
            System.out.println(e.getMessage());
            return new MensagemDTO(e.getMessage().toString(), false);
        }
        return mensagem;
    }
}
