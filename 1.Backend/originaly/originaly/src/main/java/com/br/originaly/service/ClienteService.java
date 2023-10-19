package com.br.originaly.service;

import com.br.originaly.model.Produto;
import com.br.originaly.record.ClienteRecord;
import com.br.originaly.record.EnderecoRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.record.UpdateClienteRecord;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.validator.Cryptography;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import com.br.originaly.validator.ValidaString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    /**
     * Salva um novo cliente no banco de dados
     * @param cliente
     * @return MensagemDTO
     * */
    public MensagemDTO saveCliente(ClienteRecord cliente){

        if(_validaEmail.emailValidator(cliente.email()) == false){
            return new MensagemDTO("O email é invalido.",false);
        }

        //validar se endereço existe na base
        if(_clienteRepository.getClientByEmail(cliente.email()) == null){

            //remover pontuação
            String cpf = _validaCpf.repleaceCpf(cliente.cpf());

            //validar se cpf existe
            if(_validaCpf.validarCPF(cpf) == false)
                return new MensagemDTO("O CPF é invalido.",false);

            if(_clienteRepository.getClientByCpf(cliente.cpf()) != null)
                return new MensagemDTO("O CPF já consta na base.",false);

            //nome do cliente tem que ter maid de duas palavras no minimo 3 letras cada
            if(_validaString.validateText(cliente.nome()) == false)
                return new MensagemDTO("Erro ao validar nome do cliente, verifique requisitos de nome.",false);

            //encripitar senha
            String senha = _cryptography.encryptPassword(cliente.senha());

            //Salvar cliente no banco de dadosreturn new MensagemDTO("O CPF já consta na base.",false);
            Cliente newCliente = new Cliente(cliente.nome(), cpf, cliente.email(), cliente.telefone(), cliente.dataNasc(), cliente.sexo().ordinal(), senha);

            int idCliente = _clienteRepository.saveCliente(newCliente);

            if(idCliente != 0){
                //Validar se endereço de faturamento está flegado -- > cep vem validado do front
                for(Endereco endereco : cliente.enderecos()){
                    //se o endereço de entrega não estiver flegado flegar o padrão como o de entrega
                    Endereco newEndereco = new Endereco(idCliente,
                                                        endereco.getRua(),
                                                        endereco.getNumero(),
                                                        endereco.getComplemento(),
                                                        endereco.getBairro(),
                                                        endereco.getCidade(),
                                                        endereco.getCep(),
                                                        endereco.isFaturamento(),
                                                        endereco.isEnderecoPadrao(),
                                                        endereco.isEnderecoEntrega(),
                                                       true);

                    _clienteRepository.saveEndereco(newEndereco);
                }
            } else{
                return new MensagemDTO("Erro! Cliente não cadastrado na base", false);
            }
        } else{
            return new MensagemDTO("Email já cadastrado na base", false);
        }
        return new MensagemDTO("Cliente Cadastrado com sucesso !", true);
    }

    public MensagemDTO updateDadosPessoais(UpdateClienteRecord cliente){
        Cliente dto = _clienteRepository.getClientByEmail(cliente.email());
        //validar se endereço existe na base
        if(dto != null){
            int id = dto.getId();
            //nome do cliente tem que ter maid de duas palavras no minimo 3 letras cada
            if(_validaString.validateText(cliente.nome()) == false)
                return new MensagemDTO("Erro ao validar nome do cliente, verifique requisitos de nome.",false);

            //encripitar senha
            String senha = _cryptography.encryptPassword(cliente.senha());

            //Salvar cliente no banco de dadosreturn new MensagemDTO("O CPF já consta na base.",false);
            Cliente newCliente = new Cliente(id, cliente.nome(), cliente.dataNasc(), senha);

            boolean returnCLiente = _clienteRepository.updateCliente(newCliente);

            if(returnCLiente){
                return new MensagemDTO("Cliente Atualizado na base", false);
            } else{
                return new MensagemDTO("Erro! Cliente não cadastrado na base", false);
            }
        } else{
            return new MensagemDTO("Erro ao procurar Cliente", false);
        }
    }

    /**
     * Insere um novo endereço no banco de dados
     * @param email cliente
     * @param endereco
     * @return MensagemDTO
     * */
    public MensagemDTO insertNewEndereco(String email, List<EnderecoRecord> endereco){
        Cliente cliente = _clienteRepository.getClientByEmail(email);
        int idCliente = _clienteRepository.getIdClient(cliente.getId());

        if(idCliente != 0){
            for (EnderecoRecord newEndereco: endereco){
                Endereco dto = new Endereco(idCliente,
                        newEndereco.rua(),
                        newEndereco.numero(),
                        newEndereco.complemento(),
                        newEndereco.bairro(),
                        newEndereco.cidade(),
                        newEndereco.cep(),
                        false,
                        newEndereco.isEnderecoPadrao(),
                        newEndereco.isEnderecoEntrega(),
                        true);

                System.out.println(newEndereco.cep().toString());
                _clienteRepository.saveEndereco(dto);
            }

        } else{
            return new MensagemDTO("Erro ao cadastrar um novo endereço !", false);
        }
        return new MensagemDTO("Endereço cadastrado com sucesso !", true);
    }

    /**
     * Inativa um Cliente no banco de dados
     * @param id
     * return MensagemDTO
     * */
    public MensagemDTO inactiveClient(int id){

        if(_clienteRepository.saveIsAddressActive(id, false) == false)
            return new MensagemDTO("Erro ao encontrar um cliente ou inativar um endereço", false);

        return new MensagemDTO("Cliente excluido com sucesso !", true);
    }

    /**
     * Verifica se cliente existe na base
     * Se existe retorna True se não existe retorna false
     * @param email
     * @return
     * */
    public boolean verifyEmail(String email){
        System.out.println(email);
        if(_clienteRepository.getClientByEmail(email) == null) {
            return false;
        }

        return true;
    }

    /**
     * Retorna o cliente pelo Id
     * @param email
     * */
    public ClienteRecord getClienteByEmail(String email){
        Cliente cliente = _clienteRepository.getClientByEmail(email);
        List<Endereco> enderecos = _clienteRepository.getEnderecoByIdCliente(cliente.getId());

        return new ClienteRecord(
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getDataNasc(),
                Sexo.Masculino,
                cliente.getSenha(),
                enderecos
        );
    }
}
