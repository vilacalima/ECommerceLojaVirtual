package com.br.originaly.repository;

import com.br.originaly.model.*;
import com.br.originaly.record.UpdateClienteRecord;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
     * Salva um cliente no banco de dados
     * @param cliente
     * @return id
     * */
    public boolean updateCliente(Cliente cliente) {
        Cliente debug = _clienteRepository.findById((long) cliente.getId())
                .orElseThrow(() -> new EntityNotFoundException("Objeto não encontrado"));

        debug.setNome(cliente.getNome());
        debug.setDataNasc(cliente.getDataNasc());
        debug.setSenha(cliente.getSenha());
        _clienteRepository.save(debug);

        return debug != null;
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

    /**
     * Retorna "Cliente" se o mesmo existe no banco de dados
     * @param email
     * @param senha
     * @return
     * */
    public String getLogin(String email, String senha){
        Cliente cliente = _clienteRepository.getClienteByEmailAndSenha(email, senha);

        if(cliente != null){
            return "Cliente";
        }

        return null;
    }

    /**
     * Retorna o cliente pelo Id
     * @param id
     * @return Cliente
     * */
    public Cliente getClientById(int id){
        return _clienteRepository.findById((long)id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
    }

    public List<Endereco> getEnderecoByIdCliente(int idCliente){
        return _enderecoRepository.getEnderecoByIdCliente(idCliente);
    }

}
