package com.br.originaly.controller;

import com.br.originaly.model.Endereco;
import com.br.originaly.record.ClienteRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService _clienteService;
    private MensagemDTO mensagemDTO;
    @PostMapping("/create")
    public MensagemDTO createCliente(@RequestBody ClienteRecord clienteRecord){
        try{
            return _clienteService.saveCliente(clienteRecord);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar usuário: " + ex.getMessage().toString(), false);
        }
    }

    @PostMapping("/newAddress/{id}")
    public MensagemDTO insertAddress(@RequestParam int id, @RequestBody Endereco endereco){
        try {
            return _clienteService.insertNewEndereco(id, endereco);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar usuário: " + ex.getMessage().toString(), false);
        }
    }

    @PutMapping("/deleteClient/{id}")
    public MensagemDTO getLogin(@RequestParam int id){

        try {
            return _clienteService.inactiveClient(id);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar usuário: " + ex.getMessage().toString(), false);
        }
    }
}
