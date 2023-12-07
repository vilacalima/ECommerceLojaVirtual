package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProdutoRepository {

    private final IProdutoRepository _produtoRepository;
    private final IMostruarioRepository _mostruarioRepository;
    private Date default_hora_atual = new Date();

    @Autowired
    public ProdutoRepository(IProdutoRepository produtoRepository, IMostruarioRepository mostruarioRepository){
        _produtoRepository = produtoRepository;
        _mostruarioRepository = mostruarioRepository;
    }

    /**
     * Salva um produto no banco de dados
     * @param produto
     * */
    public int saveProduto(Produto produto) {
        Produto newProduto = _produtoRepository.save(produto);
        return produto.getId();
    }

    /**
     * Atualiza um produto no banco de dados
     * @param produto
     * */
    public boolean updateProduto(Produto produto){
        Produto debug = _produtoRepository.findById((long) produto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        debug.setNome(produto.getNome());
        debug.setDescricao(produto.getDescricao());
        debug.setQuantidade(produto.getQuantidade());
        debug.setAvaliacao(produto.getAvaliacao());
        debug.setUpdateAt(produto.getUpdateAt());
        debug.setValor(produto.getValor());
        _produtoRepository.save(debug);

        return debug != null;
    }

    /**
     * Salva um item do monstruario no banco de dados
     * @param monstruario
     * */
    public boolean saveMonstruario(Monstruario monstruario) {
        Monstruario debug = _mostruarioRepository.save(monstruario);
        return debug != null;
    }

    /**
     * Deleta um item do monstruario pelo id
     * @param id
     * */
    public void deleteMonstruarioById(int id) {
         _mostruarioRepository.deleteById((long) id);
    }

    /**
     * Retorna o id do monstruario pela rota
     * @param rota
     * @return idMonstruario
     * */
    public int getMonstruarioByRota(String rota){
        Monstruario monstruario = _mostruarioRepository.getMonstruarioByRota(rota);
        return monstruario.getId();
    }

    /**
     * Atualiza um monstruario pelo id e rota
     * @param id
     * @param rota
     * */
    public boolean updateMonstruario(int id, String rota){
        Monstruario debug = _mostruarioRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Objeto não encontrado"));

        debug.setRota(rota);
        _mostruarioRepository.save(debug);

        return debug != null;
    }

    /**
     * Retorna todos os produtos
     * @return List<Produto></Produto>
     * */
    public List<Produto> getAllProduct(){
        Sort sortByUpdateAt = Sort.by(Sort.Direction.DESC, "updateAt");
        return _produtoRepository.findAll(sortByUpdateAt);
    }

    /**
     * Retorna todos os produtos ativos
     * @return List<Produto></Produto>
     * */
    public List<Produto> getAllProductActive(){
        List<Produto> produtos = _produtoRepository.findAll();
        List<Produto> newListprodutos = new ArrayList<>();

        for (Produto produto : produtos){

            if(produto.isAtivo()){
                Produto p = new Produto(
                    produto.getId(),
                    produto.getNome(),
                    produto.getDescricao(),
                    produto.getQuantidade(),
                    produto.getValor(),
                    produto.isAtivo(),
                    produto.getAvaliacao(),
                    produto.getUpdateAt()
                );

                newListprodutos.add(p);
            }

        }
        return newListprodutos;
    }

    /**
     * Retorna o id do Produto pelo id
     * @param id
     * @return idProduto
     * */
    public int getIdProduct(int id){
        Produto produto =  _produtoRepository.getById((long)id);
        return produto.getId();
    }

    /**
     * Pega produto pelo Id
     * @param id
     * @return Produto
     * */
    public Produto getProductById(int id){
        return _produtoRepository.getById((long)id);
    }

    /**
     * Retorna a url da Imagem
     * @param id
     * @return rota
     * */
    public List<Monstruario> getUrlImage(int id){
         return _mostruarioRepository.findListByIdProduto(id);
    }

    /**
     * Retorna uma lista do objeto de produto
     * @param productId
     * @return Monstruario
     * */
    public List<String> getMonstruarioByProductId(int productId){
        List<Monstruario> monstruarios = _mostruarioRepository.findListByIdProdutoAndIdOrdem(productId, 0);
        List<String> newList = new ArrayList<>();

        for (Monstruario monstruario : monstruarios){
            newList.add(monstruario.getRota());
        }

        return newList;
    }

    /**
     * Retorna uma lista do objeto de produto
     * @param productId
     * @return Monstruario
     * */
    public List<String> getAllMonstruarioByProductId(int productId){
        List<Monstruario> monstruarios = _mostruarioRepository.findListByIdProdutoAndIdOrdem(productId, 0);
        Monstruario monst = _mostruarioRepository.findByIdProdutoAndIdOrdem(productId, 1);
        List<String> newList = new ArrayList<>();

        newList.add(monst.getRota());

        for (Monstruario monstruario : monstruarios){
            newList.add(monstruario.getRota());
        }

        return newList;
    }

    /**
     * Retorna uma url de produto
     * @param productId
     * @return Monstruario
     * */
    public String getIPrimaryFileByProductId(int productId){
        Monstruario monstruario = _mostruarioRepository.findByIdProdutoAndIdOrdem(productId, 1);

        if(monstruario != null)
            return monstruario.getRota();

        return " ";
    }

    /**
     * Atualiza se um produto é ativo ou inativo no banco de dados
     * @param id
     * @param isActive
     * @return true or false
     * */
    public boolean saveIsActive(int id, boolean isActive){
        Produto debug = _produtoRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        debug.setAtivo(isActive);
        debug.setUpdateAt(default_hora_atual);
        _produtoRepository.save(debug);

        return debug != null;
    }

    public int getIdByRota(String rota){
        Monstruario debug = _mostruarioRepository.getMonstruarioByRota(rota);

        return debug.getId();
    }

}
