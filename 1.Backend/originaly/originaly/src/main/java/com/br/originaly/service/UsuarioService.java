package com.br.originaly.service;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.model.Usuario;
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

    @Autowired
    public UsuarioService(ValidaCPF validaCPF, ValidaEmail validaEmail, UsuarioRepository usuarioRepository){
        _validarCPF = validaCPF;
        _validarEmail = validaEmail;
        _usuarioRepository = usuarioRepository;
    }

    public MensagemDTO inserirUsuario(UsuarioDTO dto) throws SQLException {

        MensagemDTO mensagem;
        String cpf = _validarCPF.repleaceCpf(dto.cpf());

        if(_validarCPF.validarCPF(cpf) == false){
            mensagem = new MensagemDTO("O CPF é invalido.",false);
            return mensagem;
        }
        if(_validarEmail.emailValidator(dto.email()) == false){
            mensagem = new MensagemDTO("O email é invalido.",false);
            return mensagem;
        }

        Usuario novoUsuario = new Usuario(dto.nome(), cpf, dto.email(), dto.ativo(), dto.grupo(), dto.senha());

        System.out.println("Chegou aqui");
        salvarUsuario(novoUsuario);
//        if(){
            mensagem = new MensagemDTO("Usuario inserido com Sucesso",true);
            return mensagem;
//        } else{
//            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar o novo usuario.",false);
//            return mensagem;
//        }
    }

    /**
     * Recebe o usuário do banco de dados
     * @return List<Usuario>
     * */
    public List<Usuario> getUsuario(){
        return getAllUser();
    }

    /**
     * Atualiza um Usuario no banco de dados
     * @param request AdministradorDTO
     * */
//    public MensagemDTO atualizarUsuario(@NotNull UsuarioDTO request) throws SQLException {
//
//        MensagemDTO mensagem;
//        if(_validarCPF.validarCPF(request.Cpf) == false) {
//            mensagem = new MensagemDTO("O CPF é invalido.",false);
//            return mensagem;
//        }
//
//        if(_validarEmail.emailValidator(request.Email) == false){
//            mensagem = new MensagemDTO("O email é invalido.",false);
//            return mensagem;
//        }
//
//        if(_usuarioDao.atualizar(request)){
//            mensagem = new MensagemDTO("Cadastro do Administrador atualizado com Sucesso",true);
//            return mensagem;
//        } else{
//            mensagem = new MensagemDTO("Houve algum erro desconhecido ao salvar aluno.",false);
//            return mensagem;
//        }
//    }

    /**
     * Deleta um Usuario do banco de dados
     * */
//    public MensagemDTO deletarUsuario(String cpf) throws SQLException {
//
//        Usuario administrador = new Usuario();
//
//        MensagemDTO mensagem;
//        if(administrador.Id != 0){
//            _usuarioDao.excluir(administrador.Id);
//
//            return mensagem = new MensagemDTO("Administrador Deletado com Sucesso",true);
//        } else{
//            return mensagem = new MensagemDTO("Houve um erro ao deletar o administrador",false);
//        }
//    }

//    public List<Usuario> getUserByCpf(String cpf) {
//        return _usuarioRepository.findByCpf(cpf);
//    }

    public List<Usuario> getAllUser(){
        return _usuarioRepository.findAll();
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return _usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        _usuarioRepository.deleteById(id);
    }
}
