package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public int saveProduto(Produto produto) {
        Produto newProduto = _produtoRepository.save(produto);
        return produto.getId();
    }

    public boolean saveMonstruario(Monstruario monstruario) {
        Monstruario debug = _mostruarioRepository.save(monstruario);
        return debug != null;
    }

    public List<Produto> getAllProduct(){
        Sort sortByUpdateAt = Sort.by(Sort.Direction.DESC, "updateAt");
        return _produtoRepository.findAll(sortByUpdateAt);
    }

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
    public String getUrlImage(int id){
        Monstruario monstruario = _mostruarioRepository.findByIdProduto(id);
        return monstruario.getRota();
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

}
