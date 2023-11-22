package com.br.originaly.controller;

import com.br.originaly.model.CarrinhoTemporario;
import com.br.originaly.model.Pedido;
import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.CarrinhoTemporarioRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.PedidoRecord;
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
    public MensagemDTO save(@RequestBody CarrinhoRecord carrinho){
        try{
            return _carrinhoService.save(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }

    @PostMapping("/saveCarrinhoTemporario")
    public MensagemDTO saveCarrinhoTemporario(@RequestBody CarrinhoTemporario carrinho){
        try{
            System.out.println(carrinho.getEmailCliente());
            return _carrinhoService.saveCarrinhoTemporario(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }

    @PutMapping("/updateCarrinhoTemporario")
    public MensagemDTO updateCarrinhoTemporario(@RequestBody List<CarrinhoTemporario> carrinho){
        try{
            return _carrinhoService.updateCarrinhoTemporario(carrinho);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao atualizar dados no carrinho: " + ex.getMessage().toString(), false);
        }
    }

    @DeleteMapping("/deleteItem/{id}")
    public MensagemDTO deleteItem(@PathVariable int id){
        try{
            return _carrinhoService.deleteItemCarrinhoTemporario(id);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao deletar item do carrinho " + ex.getMessage().toString(), false);
        }
    }

    @GetMapping("/getCarrinhoTemporario/{email}")
    public List<CarrinhoTemporarioRecord> getCarrinhoTemporario(@PathVariable String email){
        return _carrinhoService.getAllCarrinhoTemporario(email);
    }

    @GetMapping("/getPedidoCliente/{email}")
    public List<PedidoRecord> getPedidoCliente(@PathVariable String email){
        return _carrinhoService.getAllPedido(email);
    }

    @GetMapping("/getCountCarrinhoTemporario/{email}")
    public long getCountCarrinhoTemporario(@PathVariable String email){
        return _carrinhoService.getCount(email);
    }

    @GetMapping("/getAllPedidoOrderByDate")
    public List<PedidoRecord> getAllPedidoOrderByDate(){
        return _carrinhoService.getAllPedidosOrderByData();
    }
}
