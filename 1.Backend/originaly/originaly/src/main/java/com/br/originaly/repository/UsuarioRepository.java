package com.br.originaly.repository;

import com.br.originaly.model.Usuario;
import com.br.originaly.validator.ValidaCPF;
import com.br.originaly.validator.ValidaEmail;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioRepository {

    private final IUsuarioRepository _usuarioRepository;

    @Autowired
    public UsuarioRepository(IUsuarioRepository usuarioRepository){
        _usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getAllUser(){
        return _usuarioRepository.findAll();
    }

    public Usuario getUserById(int id){
        return _usuarioRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario não encontrado"));
    }

    public boolean save(Usuario usuario) {
        Usuario debug = _usuarioRepository.save(usuario);
        return debug != null;
    }

    public boolean update(Usuario usuario){
        Usuario debug = _usuarioRepository.findById((long) usuario.getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario não encontrado"));

        debug.setNome(usuario.getNome());
        debug.setCpf(usuario.getCpf());
        debug.setSenha(usuario.getSenha());
        _usuarioRepository.save(debug);

        return debug != null;
    }

    public boolean saveIsActive(int id, boolean isActive){
        Usuario debug = _usuarioRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario não encontrado"));

        debug.setAtivo(isActive);
        _usuarioRepository.save(debug);

        return debug != null;
    }

    /**
     * Retorna Grupo de usuario
     * @param email
     * @param senha
     * @return grupo
     * */
    public String getGroup(String email, String senha){
        Usuario debug = _usuarioRepository.getUserByEmailAndSenha(email, senha);

        if(debug != null && debug.isAtivo())
            return debug.getGrupo();

        return null;
    }
}
