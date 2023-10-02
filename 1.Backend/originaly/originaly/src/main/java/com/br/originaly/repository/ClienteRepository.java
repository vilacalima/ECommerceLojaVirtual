package com.br.originaly.repository;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.model.Produto;
import jakarta.persistence.EntityNotFoundException;
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
        return newProduto.getId();
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

    /**
     * Salva um endereço no banco de dados
     * @param endereco
     * @return
     * */
    public boolean saveEndereco(Endereco endereco){
        Endereco newEndereco = _enderecoRepository.save(endereco);

        if(newEndereco != null)
            return true;

        return false;
    }

    /**
     * Retorna um cliente pelo id
     * @param id
     * @return cliente
     * */
    public int getIdClient(int id){
        Cliente cliente =  _clienteRepository.getById((long)id);
        return cliente.getId();
    }

    /**
     * Atualiza se um endereço é ativo ou inativo no banco de dados
     * @param id
     * @param isActive
     * @return true or false
     * */
    public boolean saveIsAddressActive(int id, boolean isActive){
        Endereco debug = _enderecoRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        debug.setAtivo(isActive);
        _enderecoRepository.save(debug);

        return debug != null;
    }

}
