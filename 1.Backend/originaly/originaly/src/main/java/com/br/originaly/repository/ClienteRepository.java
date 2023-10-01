package com.br.originaly.repository;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Produto;
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

    /**
     * Salva um cliente no banco de dados
     * @param cliente
     * @return id
     * */
    public int saveCliente(Cliente cliente) {
        Cliente newProduto = _clienteRepository.save(cliente);
        return cliente.getId();
    }

    /**
     * Retorna um cliente pelo email do banco de dados
     * @param email
     * @return cliente
     * */
    public Cliente getClientByEmail(String email){
        return _clienteRepository.findByEmail(email);
    }

    /**
     * Retorna um cliente pelo cpf do banco de dados
     * @param cpf
     * @returm cliente
     * */
    public Cliente getClientByCpf(String cpf){
        return _clienteRepository.findByCpf(cpf);
    }


}
