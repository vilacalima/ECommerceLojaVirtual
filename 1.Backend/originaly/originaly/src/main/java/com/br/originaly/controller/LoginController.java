package com.br.originaly.controller;

import com.br.originaly.dto.LoginRecord;
import com.br.originaly.service.LoginService;
import com.br.originaly.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginService _loginService;

    @GetMapping("/getLogin")
    public String getLogin(@RequestBody LoginRecord login){

        try {
            return _loginService.toLogin(login);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return "Email ou senha errado";
        }
    }
}
