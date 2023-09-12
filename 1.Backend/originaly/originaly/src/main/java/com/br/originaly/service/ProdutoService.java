package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.ProdutoDTO;
import com.br.originaly.model.EnvProdutoDTO;
import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository _produtoRepository;
    private ImageService _image;
    private MensagemDTO mensagem;
    private Date default_hora_atual = new Date();

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository, ImageService image) {
        _produtoRepository = produtoRepository;
        _image = image;
    }

    /**
     * Serviço para salvar um novo produto
     * @param nome
     * @param descricao
     * @param quantidade
     * @param  valor
     * @param ativo
     * @param avaliacao
     * @param file
     * @return MensagemDTO
     * */
    public MensagemDTO newProduto(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, MultipartFile file) throws IOException {

        //pegar dados do produto e mapear
        Produto dtoProduct = new Produto(
            nome,
            descricao,
            quantidade,
            valor,
            ativo,
            avaliacao,
            default_hora_atual
        );

        //pegar imagem salvar no banco de imagens e pegar a url
        String url = _image.uploadNewImage(file);

        //salvar o produto no banco de dados e pegar o id do produto
        int idProduct = _produtoRepository.saveProduto(dtoProduct);

        if(idProduct != 0){
            System.out.println("entrou aqui");
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

    public List<Produto> getProduct(){
        return _produtoRepository.getAllProduct();
    }

    public String getImage(int id){
        int idProduct = _produtoRepository.getIdProduct(id);
        String image = _produtoRepository.getUrlImage(idProduct);
        return _image.getUrlDaImagem(image);
    }

    public EnvProdutoDTO getProductById(int id){
        Produto produto = _produtoRepository.getProductById(id);
        String file = _produtoRepository.getUrlImage(produto.getId());

        EnvProdutoDTO envProduto = new EnvProdutoDTO(
            produto.getNome(),
            produto.getDescricao(),
            produto.getQuantidade(),
            produto.getValor(),
            produto.isAtivo(),
            produto.getAvaliacao(),
            file
        );

        return envProduto;
    }

    /**
     * Marca no banco de dados se o produto está ativo
     * @param id, isActive
     * @return MensagemDTO
     * */
    public MensagemDTO isUserActive(int id, boolean isActive){

        if(_produtoRepository.saveIsActive(id, isActive)){
            mensagem = new MensagemDTO("Produto atualizado",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Produto não atualizado.",false);
            return mensagem;
        }
    }
}
