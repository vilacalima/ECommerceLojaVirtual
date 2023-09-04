package com.br.originaly.service;

import com.br.originaly.repository.MonstruarioRepository;
import com.br.originaly.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    private final ProdutoRepository _produtoRepository;
    private final MonstruarioRepository _mostruarioRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository, MonstruarioRepository mostruarioRepository) {
        _produtoRepository = produtoRepository;
        _mostruarioRepository = mostruarioRepository;
    }


}
