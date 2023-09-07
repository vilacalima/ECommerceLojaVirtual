package com.br.originaly.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;
    private String Nome;
    @Column(name = "cpf")
    private String Cpf;
    private String Email;
    private boolean Ativo;
    private String Grupo;
    private String Senha;

    /**
     * Objeto que instancia um perfil de Usuario
     * */
    public Usuario(String nome, String cpf, String email, boolean ativo, String grupo, String senha) {
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Ativo = ativo;
        Grupo = grupo;
        Senha = senha;
    }

    /**
     * Objeto que instancia um perfil de Usuario
     * */
    public Usuario(int id, String nome, String cpf, String email, boolean ativo, String grupo, String senha) {
        Id = id;
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Ativo = ativo;
        Grupo = grupo;
        Senha = senha;
    }

    /**
     * Objeto que instancia um perfil de Usuario
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
    public boolean isAtivo() { return Ativo; }
    public String getSenha() { return Senha; }
    public void setSenha(String senha) { Senha = senha; }
}
