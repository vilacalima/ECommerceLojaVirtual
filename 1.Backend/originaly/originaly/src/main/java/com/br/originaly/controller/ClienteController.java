package com.br.originaly.controller;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Endereco;
import com.br.originaly.record.ClienteRecord;
import com.br.originaly.record.EnderecoRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.UpdateClienteRecord;
import com.br.originaly.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/updateDadosPessoais")
    public MensagemDTO updateDadosPessoais(@RequestBody UpdateClienteRecord clienteRecord){
        try{
            return _clienteService.updateDadosPessoais(clienteRecord);
        } catch(Exception ex){
            System.out.println(ex.getMessage());
            return new MensagemDTO("Erro ao salvar usuário: " + ex.getMessage().toString(), false);
        }
    }

    @PostMapping("/newAddress/{email}")
    public MensagemDTO insertAddress(@PathVariable String email, @RequestBody List<EnderecoRecord> endereco){
        try {
            return _clienteService.insertNewEndereco(email, endereco);
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

    @GetMapping("/verificarEmail/{email}")
    public boolean verifyEmailExists(@PathVariable String email){
        System.out.println(email);
        return _clienteService.verifyEmail(email);
    }

    @GetMapping("/getCliente/{email}")
    public ClienteRecord getClient(@PathVariable String email){
        return  _clienteService.getClienteByEmail(email);
    }

    @GetMapping("/getAddress/{email}")
    public Endereco getAddress(@PathVariable String email){
        return _clienteService.getEnderecoByIdAndActive(email);
    }
}
