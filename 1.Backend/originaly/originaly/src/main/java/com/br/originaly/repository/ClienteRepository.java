package com.br.originaly.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteRepository {

    private final IClienteRepository _clienteRepository;
    private final IEnderecoRepository _enderecoRepository;

    @Autowired
    public ClienteRepository(IClienteRepository clienteRepository, IEnderecoRepository enderecoRepository){
        _clienteRepository = clienteRepository;
        _enderecoRepository = enderecoRepository;
    }


}
