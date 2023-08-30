package com.br.originaly.controller;

import com.br.originaly.dto.UsuarioDTO;
import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.service.UsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @PostMapping("/novoAdministrador")
    public UsuarioDTO novoAdministrador(UsuarioDTO dto) throws SQLException {

        try{
            MensagemDTO salvar = UsuarioService.inserirAdministrador(dto);

            if(salvar.isSuccess)
                return dto;

        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return dto;
    }
}
