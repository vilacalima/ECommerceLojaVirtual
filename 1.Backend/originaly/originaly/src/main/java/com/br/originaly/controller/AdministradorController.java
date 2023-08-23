package com.br.originaly.controller;

import com.br.originaly.dto.AdministradorDTO;
import com.br.originaly.dto.MensagemDTO;
import com.br.originaly.service.AdministradorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class AdministradorController {

    @PostMapping("/novoAdministrador")
    public AdministradorDTO novoAdministrador(AdministradorDTO dto) throws SQLException {

        try{
            MensagemDTO salvar = AdministradorService.inserirAdministrador(dto);

            if(salvar.isSuccess)
                return dto;

        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return dto;
    }
}
