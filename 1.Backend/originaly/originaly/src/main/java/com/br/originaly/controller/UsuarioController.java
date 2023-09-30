package com.br.originaly.controller;

import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.model.Usuario;
import com.br.originaly.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioService _usuario;

    @PostMapping("/novoUsuario")
    public MensagemDTO novoUsuario(@RequestBody Usuario dto) throws SQLException {

        MensagemDTO mensagem = null;

        try{
            mensagem = _usuario.inserirUsuario(dto);

        } catch (Exception e){
            System.out.println(e.getMessage());
            return new MensagemDTO(e.getMessage().toString(), false);
        }
        return mensagem;
    }

    @PutMapping("/atualizarUsuario")
    public MensagemDTO atualizarUsuario(@RequestBody Usuario dto){

        MensagemDTO mensagem = null;

        try{
            mensagem = _usuario.updateUsuario(dto);

        } catch (Exception e){
            System.out.println(e.getMessage());
            return new MensagemDTO(e.getMessage().toString(), false);
        }
        return mensagem;
    }

    @PutMapping("/usuarioAtivo/{id}/{isActive}")
    public MensagemDTO usuarioAtivo(@PathVariable int id, @PathVariable boolean isActive){
        MensagemDTO mensagem = null;

        try{
            mensagem = _usuario.isUserActive(id, isActive);

        } catch (Exception e){
            System.out.println(e.getMessage());
            return new MensagemDTO(e.getMessage().toString(), false);
        }
        return mensagem;
    }

    @GetMapping("/getUsuarioById/{id}")
    public Usuario getUsuarioById(@PathVariable int id){
        return _usuario.getUsuarioById(id);
    }

    @GetMapping("/getUsuario")
    public List<Usuario> getUsuario(){
        return _usuario.getUsuario();
    }
}
