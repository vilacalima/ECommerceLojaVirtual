package com.br.originaly.controller;

import com.br.originaly.record.MensagemDTO;
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
/***
 * 
 *  Função para criar novo Usuario
 *  URL /novoUsuario
 *  Recebe RequestBody com os dados do novo Usuario 
 */
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

/***
 * 
 *  Função para atualizar Usuario
 *  URL /atualizarUsuario
 *  Recebe RequestBody com os dados do Usuario 
 */

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

    /***
 * 
 *  Função para atualizar status do usuario
 *  URL /usuarioAtivo
 *  Recebe id e novo estado 
 */ 

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

        /***
 * 
 *  Função para buscar usuario por ID
 *  URL /getUusarioById
 *  Recebe id 
 */ 

    @GetMapping("/getUsuarioById/{id}")
    public Usuario getUsuarioById(@PathVariable int id){
        return _usuario.getUsuarioById(id);
    }

        /***
 * 
 *  Função para listar usuario
 *  URL /getUsuario
 */ 

    @GetMapping("/getUsuario")
    public List<Usuario> getUsuario(){
        return _usuario.getUsuario();
    }
}
