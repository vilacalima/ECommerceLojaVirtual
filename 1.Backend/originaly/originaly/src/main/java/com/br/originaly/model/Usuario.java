package com.br.originaly.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Nome;
    private String Cpf;
    private String Email;
    private boolean Ativo;
    private String Grupo;

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Usuario(String nome, String cpf, String email, boolean ativo, String grupo) {
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Ativo = ativo;
        Grupo = grupo;
    }

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Usuario(int id, String nome, String cpf, String email, boolean ativo, String grupo) {
        Id = id;
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Ativo = ativo;
        Grupo = grupo;
    }

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Usuario() {

    }

    public int getId() { return Id; }
    public void setId(int id) { Id = id; }
    public String getNome() { return Nome; }
    public void setNome(String nome) { Nome = nome; }
    public String getCpf() { return Cpf; }
    public void setCpf(String cpf) { Cpf = cpf; }
    public String getEmail() { return Email; }
    public void setEmail(String email) { Email = email; }
    public boolean getAtivo() { return Ativo; }
    public void setAtivo(boolean ativo) { Ativo = ativo; }
    public String getGrupo() { return Grupo; }
    public void setGrupo(String grupo) { Grupo = grupo; }
}
