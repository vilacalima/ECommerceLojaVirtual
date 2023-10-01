package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository _clienteRepository;
    MensagemDTO mensagemDTO;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository){
        _clienteRepository = clienteRepository;
    }

    public MensagemDTO saveCliente(Cliente cliente, List<Endereco> enderecoList){

        //validar se endereço existe na base

        //validar se cpf existe

        //Validar se endereço de faturamento está flegado

        //validar cep

        //se o endereço de entrega não estiver flegado flegar o padrão como o de entrega

        //nome do cliente tem que ter maid de duas palavras no minimo 3 letras cada

        //encripitar senha

        //Salvar no banco de dados

        //retornar mensagem



        return mensagemDTO;
    }

    public MensagemDTO insertNewEndereco(){
        //Inserindo novo endereco
        return mensagemDTO;
    }

    public MensagemDTO isAtctive(){
        //inativar endereço no banco de dados
        return mensagemDTO;
    }
}
