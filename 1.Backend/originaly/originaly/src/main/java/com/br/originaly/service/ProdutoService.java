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
import java.util.ArrayList;
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
    public MensagemDTO newProduto(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, MultipartFile filePrimary, MultipartFile[] files) throws IOException {

        System.out.println("Entrou aqui no metodo de criação de produto");
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

        //salvar o produto no banco de dados e pegar o id do produto
        int idProduct = _produtoRepository.saveProduto(dtoProduct);

        if(idProduct != 0){

            //salvando imagem principal
            String imagePrimary = _image.uploadNewImage(filePrimary);
            _produtoRepository.saveMonstruario(new Monstruario(idProduct, imagePrimary, 1));

            //Salvando as outras imagens
            for (MultipartFile file : files) {
                System.out.println("Entrou aqui no for");
                String rota = _image.uploadNewImage(file);

                _produtoRepository.saveMonstruario(new Monstruario(idProduct, rota, 0));
            }

        } else{
            return new MensagemDTO("Erro ao salvar produto no banco de dados", false);
        }

        return new MensagemDTO("Produtos salvo com sucesso", true);
    }

    public MensagemDTO updateProduto(int id, String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, MultipartFile[] files, List<String> rotaAntiga) throws IOException {

        Produto produto = _produtoRepository.getProductById(id);

        if(produto != null) {
            //pegar dados do produto e mapear
            Produto dtoProduct = new Produto(
                    id,
                    nome,
                    descricao,
                    quantidade,
                    valor,
                    ativo,
                    avaliacao,
                    default_hora_atual
            );

            List<String> novaRota = new ArrayList<>();

            //pegar a nova imagem e salvar no banco de imagens e gerar nova rota
            if (files != null) {
                for (MultipartFile file : files) {
                    String rota = _image.uploadNewImage(file);

                    novaRota.add(rota);
                }
            }

            //fazer update do produto no banco de dados
            boolean updateProduto = _produtoRepository.updateProduto(dtoProduct);

            if (updateProduto) {
                for (String rota : rotaAntiga) {
                    int i = 0;
                    int idMonstruario = _produtoRepository.getIdByRota(rota);


                    _produtoRepository.updateMonstruario(idMonstruario, novaRota.get(i));

                    i++; //A cada passagem no foreach vai incrementando mai um

                    //tenho que bater a rota antiga e salvar a nota
                    //deletar arquivo antigo

                }
            } else {
                return new MensagemDTO("Falha ao atualizar Produto", false);
            }
        } else{
            return new MensagemDTO("Produto não encontrado, id: " + id, false);
        }

        return new MensagemDTO("Produto atualizado com sucesso", true);
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
