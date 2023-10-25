package com.br.originaly.service;

import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.UpdateProdutoRecord;
import com.br.originaly.model.EnvProdutoDTO;
import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    /**
     * Faz o Updade de um Produto
     * @param product
     * @return MensagemDTO
     * */
    public MensagemDTO updateProduto(UpdateProdutoRecord product) throws IOException {

        Produto produto = _produtoRepository.getProductById(product.id());

        if(produto != null) {
            //pegar dados do produto e mapear
            Produto dtoProduct = new Produto(
                    product.id(),
                    product.nome(),
                    product.descricao(),
                    product.quantidade(),
                    product.valor(),
                    product.ativo(),
                    product.avaliacao(),
                    default_hora_atual
            );

            //fazer update do produto no banco de dados
            _produtoRepository.updateProduto(dtoProduct);
        } else{
            return new MensagemDTO("Produto não encontrado, id: " + product.id(), false);
        }

        return new MensagemDTO("Produto atualizado com sucesso", true);
    }

    /**
     * Faz o Updade de um Produto
     * @param idProduct
     * @param files
     * @param rotaAntiga
     * @return MensagemDTO
     * */
    public MensagemDTO updateImage(int idProduct, List<String> rotaAntiga, MultipartFile[] files) throws IOException {

        Produto product = _produtoRepository.getProductById(idProduct);

        if(product != null) {

            List<String> novaRota = new ArrayList<>();

            //pegar a nova imagem e salvar no banco de imagens e gerar nova rota
            if (files != null) {
                for (MultipartFile file : files) {
                    String rota = _image.uploadNewImage(file);
                    novaRota.add(rota);
                }
            }

            if (novaRota != null) {
                for (String rota : rotaAntiga) {
                    int i = 0;
                    int idMonstruario = _produtoRepository.getIdByRota(rota);

                    if(idMonstruario != 0){
                        _produtoRepository.updateMonstruario(idMonstruario, novaRota.get(i));
                    }

                    i++; //A cada passagem no foreach vai incrementando mais um
                }

                for (String rota : rotaAntiga) {
                    _image.deletImage(rota);
                }
            } else {
                return new MensagemDTO("Falha ao atualizar Imagem", false);
            }
        } else{
            return new MensagemDTO("Imagem não encontrada, id: " + idProduct, false);
        }

        return new MensagemDTO("Banco de imagens atualizado com sucesso", true);
    }


    public List<EnvProdutoDTO> getProductAndImage(){
        List<Produto> produto = _produtoRepository.getAllProductActive();
        List<EnvProdutoDTO> listProduto = new ArrayList<>();

        for (Produto newProduto: produto){
            String primaryFile = _produtoRepository.getIPrimaryFileByProductId(newProduto.getId());

            EnvProdutoDTO envProduto = new EnvProdutoDTO(
                    newProduto.getId(),
                    newProduto.getNome(),
                    newProduto.getDescricao(),
                    newProduto.getValor(),
                    newProduto.isAtivo(),
                    newProduto.getAvaliacao(),
                    primaryFile
            );

            listProduto.add(envProduto);
        }

        return listProduto;
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
        List<String> file = _produtoRepository.getMonstruarioByProductId(produto.getId());
        String primaryFile = _produtoRepository.getIPrimaryFileByProductId(produto.getId());

        EnvProdutoDTO envProduto = new EnvProdutoDTO(
            produto.getId(),
            produto.getNome(),
            produto.getDescricao(),
            produto.getQuantidade(),
            produto.getValor(),
            produto.isAtivo(),
            produto.getAvaliacao(),
            file,
            primaryFile
        );

        return envProduto;
    }

    public EnvProdutoDTO getProductAndAllFileById(int id){
        Produto produto = _produtoRepository.getProductById(id);
        List<String> file = _produtoRepository.getAllMonstruarioByProductId(produto.getId());
        String primaryFile = _produtoRepository.getIPrimaryFileByProductId(produto.getId());

        EnvProdutoDTO envProduto = new EnvProdutoDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getQuantidade(),
                produto.getValor(),
                produto.isAtivo(),
                produto.getAvaliacao(),
                file,
                primaryFile
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
