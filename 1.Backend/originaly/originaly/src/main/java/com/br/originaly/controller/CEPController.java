package com.br.originaly.controller;

import com.br.originaly.model.ViaCEPResponse;
import com.br.originaly.service.ViaCEPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cep")
public class CEPController {

    @Autowired
    private ViaCEPService viaCEPService;

    @GetMapping("/{cep}")
    public ViaCEPResponse consultarCEP(@PathVariable String cep) {
        return viaCEPService.consultarCEP(cep);
    }
}

