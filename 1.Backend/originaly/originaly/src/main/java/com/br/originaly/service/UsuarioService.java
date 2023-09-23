package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.dto.UsuarioUpdateDTO;
import com.br.originaly.model.Usuario;
import com.br.originaly.repository.IUsuarioRepository;
import com.br.originaly.repository.UsuarioRepository;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class UsuarioService {

    private final ValidaCPF _validarCPF;
    private final ValidaEmail _validarEmail;
    private final UsuarioRepository _usuarioRepository;
    //private final PasswordEncoder _passwordEncoder;
    private MensagemDTO mensagem;

    @Autowired
    public UsuarioService(ValidaCPF validaCPF, ValidaEmail validaEmail, UsuarioRepository usuarioRepository){
        _validarCPF = validaCPF;
        _validarEmail = validaEmail;
        _usuarioRepository = usuarioRepository;
//        _passwordEncoder = passwordEncoder;
    }

    public MensagemDTO inserirUsuario(UsuarioDTO dto) throws SQLException {

        String cpf = _validarCPF.repleaceCpf(dto.cpf());

        if(_validarCPF.validarCPF(cpf) == false){
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }
        if(_validarEmail.emailValidator(dto.email()) == false){
            mensagem = new MensagemDTO("O email é invalido.",false);
            return mensagem;
        }

//        String senha = _passwordEncoder.encode(dto.senha());

        Usuario novoUsuario = new Usuario(dto.nome(), cpf, dto.email(), dto.ativo(), dto.grupo(), dto.senha());

        if(_usuarioRepository.save(novoUsuario)){
            mensagem = new MensagemDTO("Usuario inserido com Sucesso",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar o novo usuario.",false);
            return mensagem;
        }
    }

    /**
     * Recebe o usuário do banco de dados
     * @return List<Usuario>
     * */
    public List<Usuario> getUsuario(){
        return _usuarioRepository.getAllUser();
    }

    /**
     * Recebe o usuário do banco de dados
     * @return Usuario
     * */
    public Usuario getUsuarioById(int id){
        return _usuarioRepository.getUserById(id);
    }

    /**
     * Atualiza um Usuario no banco de dados
     * @param request AdministradorDTO
     * */
    public MensagemDTO updateUsuario(UsuarioUpdateDTO request) throws SQLException {

        String cpf = _validarCPF.repleaceCpf(request.cpf());

        if(_validarCPF.validarCPF(cpf) == false) {
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }

        //String senha = _passwordEncoder.encode(request.senha());

        Usuario usuario = new Usuario(request.id(), request.nome(), cpf, request.email(), request.ativo(), request.grupo(), request.senha());

        if(_usuarioRepository.update(usuario)){
            mensagem = new MensagemDTO("Cadastro do usuario atualizado com Sucesso",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Houve algum erro desconhecido ao atualiza o usuario.",false);
            return mensagem;
        }
    }

    /**
     * Marca no banco de dados se o usuário está ativo
     * @param id, isActive
     * @return MensagemDTO
     * */
    public MensagemDTO isUserActive(int id, boolean isActive){

        if(_usuarioRepository.saveIsActive(id, isActive)){
            mensagem = new MensagemDTO("Usuário atualizado",true);
            return mensagem;
        } else{
            mensagem = new MensagemDTO("Usuário não atualizado.",false);
            return mensagem;
        }
    }
}
