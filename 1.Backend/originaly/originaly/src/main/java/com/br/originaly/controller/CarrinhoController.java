package com.br.originaly.controller;

import com.br.originaly.model.CarrinhoTemporario;
import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.service.CarrinhoService;
import com.br.originaly.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/saveCarrinhoTemporario")
    public MensagemDTO saveCarrinhoTemporario(@RequestParam(required = false) CarrinhoTemporario carrinho){
        try{
            return _carrinhoService.saveCarrinhoTemporario(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }

    @PutMapping("/updateCarrinhoTemporario")
    public MensagemDTO updateCarrinhoTemporario(@RequestParam CarrinhoTemporario carrinho){
        try{
            return _carrinhoService.updateCarrinhoTemporario(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao atualizar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }

    @GetMapping("/getCarrinhoTemporario")
    public List<CarrinhoTemporario> getCarrinhoTemporario(@PathVariable String email){
        return _carrinhoService.getAllCarrinhoTemporario(email);
    }

    @GetMapping("/getCountCarrinhoTemporario")
    public long getCountCarrinhoTemporario(){
        return _carrinhoService.getCount();
    }
}
