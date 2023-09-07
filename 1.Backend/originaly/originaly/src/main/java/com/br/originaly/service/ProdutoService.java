package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.ProdutoDTO;
import com.br.originaly.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    private final ProdutoRepository _produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        _produtoRepository = produtoRepository;
    }

//    public MensagemDTO newProduto(ProdutoDTO product){
//
//        return new MensagemDTO();
//    }
}
