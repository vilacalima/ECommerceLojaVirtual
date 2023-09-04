package com.br.originaly.repository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoRepository {

    private final IProdutoRepository _produtoRepository;

    @Autowired
    public ProdutoRepository(IProdutoRepository produtoRepository){
        _produtoRepository = produtoRepository;
    }

}
