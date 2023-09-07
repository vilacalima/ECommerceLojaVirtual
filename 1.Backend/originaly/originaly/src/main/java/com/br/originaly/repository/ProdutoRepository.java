package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import com.br.originaly.model.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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

    public boolean saveProduto(Produto produto) {
        Produto debug = _produtoRepository.save(produto);
        return debug != null;
    }

    public boolean saveMonstruario(Monstruario monstruario) {
        Monstruario debug = _mostruarioRepository.save(monstruario);
        return debug != null;
    }

}
