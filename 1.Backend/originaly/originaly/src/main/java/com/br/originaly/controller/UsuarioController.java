package com.br.originaly.controller;

import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioService _usuario;

    @PostMapping("/novoUsuario")
    public MensagemDTO novoUsuario(UsuarioDTO dto) throws SQLException {
        MensagemDTO mensagem;
        try{
            mensagem = _usuario.inserirUsuario(dto);

        } catch (Exception e){
            System.out.println(e.getMessage());
            return new MensagemDTO(e.getMessage().toString(), false);
        }
        return mensagem;
    }
}
