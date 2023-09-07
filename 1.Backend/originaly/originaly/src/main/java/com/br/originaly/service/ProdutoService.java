package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.ProdutoDTO;
import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProdutoService {

    private final ProdutoRepository _produtoRepository;
    private ImageService _image;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository, ImageService image) {
        _produtoRepository = produtoRepository;
        _image = image;
    }

    public MensagemDTO newProduto(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, MultipartFile file) throws IOException {

        //pegar dados do produto e mapear
        Produto dtoProduct = new Produto(
            nome,
            descricao,
            quantidade,
            valor,
            ativo,
            avaliacao
        );

        //pegar imagem salvar no banco de imagens e pegar a url
        String url = _image.uploadImagem(file);

        //salvar o produto no banco de dados e pegar o id do produto
        int idProduct = _produtoRepository.saveProduto(dtoProduct);

        if(idProduct != 0){

            Monstruario dtoMonstruario = new Monstruario(
                idProduct,
                url,
                1
            );

            boolean saveMonstruario = _produtoRepository.saveMonstruario(dtoMonstruario);

            if(saveMonstruario){
                return new MensagemDTO("Produtos salvo com sucesso", true);
            } else{
                return new MensagemDTO("Erro no processo de salvar a imagem no repositorio", true);
            }

        } else{
            return new MensagemDTO("Erro ao salvar produto no banco de dados", false);
        }
    }

//    public Monstruario getMonstruario(int image){
//
//    }
}
