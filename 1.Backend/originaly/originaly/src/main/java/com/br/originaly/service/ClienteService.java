package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import com.br.originaly.validator.ValidaString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository _clienteRepository;
    private final Cryptography _cryptography;
    private final ValidaEmail _validaEmail;
    private final ValidaCPF _validaCpf;
    private final ValidaString _validaString;
    private MensagemDTO mensagemDTO;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository,
                          Cryptography cryptography,
                          ValidaEmail validaEmail,
                          ValidaCPF validaCPF,
                          ValidaString validaString){
        _clienteRepository = clienteRepository;
        _cryptography = cryptography;
        _validaEmail = validaEmail;
        _validaCpf = validaCPF;
        _validaString = validaString;
    }

    public MensagemDTO saveCliente(Cliente cliente, List<Endereco> enderecoList){

        if(_validaEmail.emailValidator(cliente.getEmail()) == false){
            return new MensagemDTO("O email é invalido.",false);
        }

        //validar se endereço existe na base
        if(_clienteRepository.getClientByEmail(cliente.getEmail()) == null){

            //remover pontuação
            String cpf = _validaCpf.repleaceCpf(cliente.getCpf());

            //validar se cpf existe
            if(_validaCpf.validarCPF(cpf) == false)
                return new MensagemDTO("O CPF é invalido.",false);

            if(_clienteRepository.getClientByCpf(cliente.getCpf()) == null)
                return new MensagemDTO("O CPF já consta na base.",false);

            //nome do cliente tem que ter maid de duas palavras no minimo 3 letras cada
            if(_validaString.validateText(cliente.getNome()) == false)
                return new MensagemDTO("Erro ao validar nome do cliente, verifique requisitos de nome.",false);

            //encripitar senha
            String senha = _cryptography.encryptPassword(cliente.getSenha());

            //Salvar cliente no banco de dadosreturn new MensagemDTO("O CPF já consta na base.",false);
            Cliente newCliente = new Cliente(cliente.getNome(), cpf, cliente.getEmail(), cliente.getTelefone(), cliente.getDataNasc(), cliente.getSexo(), senha);
            int idCliente = _clienteRepository.saveCliente(newCliente);
            
            //Validar se endereço de faturamento está flegado

            //validar cep

            //se o endereço de entrega não estiver flegado flegar o padrão como o de entrega




            //Salvar endereço no banco de dados


            //retornar mensagem
        } else{
            return new MensagemDTO("Email já cadastrado na base", false);
        }
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
