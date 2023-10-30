package com.br.originaly.controller;

import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.service.CarrinhoService;
import com.br.originaly.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService _carrinhoService;

    @PostMapping("/save")
    public MensagemDTO save(@RequestParam CarrinhoRecord carrinho){
        try{
            return _carrinhoService.save(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }
}
