package com.br.originaly.model;

import jakarta.persistence.*;

@Entity
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

    public int getId() { return id; }
    public void setId(int _id) { id = _id; }
    public String getNome() { return nome; }
    public void setNome(String _nome) { nome = _nome; }
    public String getCpf() { return cpf; }
    public void setCpf(String _cpf) { cpf = _cpf; }
    public String getEmail() { return email; }
    public void setEmail(String _email) { email = _email; }
    public boolean getAtivo() { return ativo; }
    public void setAtivo(boolean _ativo) { ativo = _ativo; }
    public String getGrupo() { return grupo; }
    public void setGrupo(String _grupo) { _grupo = grupo; }
    public boolean isAtivo() { return ativo; }
    public String getSenha() { return senha; }
    public void setSenha(String _senha) { senha = _senha; }
}
