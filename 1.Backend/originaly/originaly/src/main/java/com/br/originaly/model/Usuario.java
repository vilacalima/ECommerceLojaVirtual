package com.br.originaly.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "cpf")
    private String cpf;
    @Column(name = "email")
    private String email;
    @Column(name = "ativo")
    private boolean ativo;
    @Column(name = "grupo")
    private String grupo;
    @Column(name = "senha")
    private String senha;

    /**
     * Objeto que instancia um perfil de Usuario
     * */
    public Usuario(String _nome, String _cpf, String _email, boolean _ativo, String _grupo, String _senha) {
        nome = _nome;
        cpf = _cpf;
        email = _email;
        ativo = _ativo;
        grupo = _grupo;
        senha = _senha;
    }

    /**
     * Objeto que instancia um perfil de Usuario
     * */
    public Usuario(int _id, String _nome, String _cpf, String _email, boolean _ativo, String _grupo, String _senha) {
        id = _id;
        nome = _nome;
        cpf = _cpf;
        email = _email;
        ativo = _ativo;
        grupo = _grupo;
        senha = _senha;
    }

    /**
     * Objeto que instancia um perfil de Usuario
     * */
    public Usuario() {

    }
}
