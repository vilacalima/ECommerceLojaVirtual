package com.lojavirtual.senac.controller;

import com.lojavirtual.senac.dto.AdministradorDTO;
import com.lojavirtual.senac.dto.MensagemDTO;
import com.lojavirtual.senac.service.AdministradorService;
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
