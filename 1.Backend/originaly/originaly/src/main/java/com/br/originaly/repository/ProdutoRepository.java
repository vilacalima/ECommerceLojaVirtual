package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoRepository {

    private final IProdutoRepository _produtoRepository;
    private final IMostruarioRepository _mostruarioRepository;

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
        return _produtoRepository.findAll();
    }

    public int getIdProduct(int id){
        Produto produto =  _produtoRepository.getById((long)id);
        return produto.getId();
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

}
