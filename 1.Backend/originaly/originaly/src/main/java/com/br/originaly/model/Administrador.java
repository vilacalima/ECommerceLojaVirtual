package com.br.originaly.model;

public class Administrador {

    public int Id;
    public String Nome;
    public String Cpf;
    public String Email;
    public String Telefone;
    public boolean Ativo;
    public String Cep;
    public String Rua;
    public String Bairro;
    public String Grupo;

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Administrador(String nome, String cpf, String email, String telefone, boolean ativo, String cep, String rua, String bairro, String grupo) {
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Telefone = telefone;
        Ativo = ativo;
        Cep = cep;
        Rua = rua;
        Bairro = bairro;
        Grupo = grupo;
    }

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Administrador(int id, String nome, String cpf, String email, String telefone, boolean ativo, String cep, String rua, String bairro, String grupo) {
        Id = id;
        Nome = nome;
        Cpf = cpf;
        Email = email;
        Telefone = telefone;
        Ativo = ativo;
        Cep = cep;
        Rua = rua;
        Bairro = bairro;
        Grupo = grupo;
    }

    /**
     * Objeto que instancia um perfil de Administrador
     * */
    public Administrador() {

    }

    public int getId() { return Id; }
    public void setId(int id) { Id = id; }
    public String getNome() { return Nome; }
    public void setNome(String nome) { Nome = nome; }
    public String getCpf() { return Cpf; }
    public void setCpf(String cpf) { Cpf = cpf; }
    public String getEmail() { return Email; }
    public void setEmail(String email) { Email = email; }
    public String getTelefone() { return Telefone; }
    public void setTelefone(String telefone) { Telefone = telefone; }
    public boolean getAtivo() { return Ativo; }
    public void setAtivo(boolean ativo) { Ativo = ativo; }
    public String getCep() { return Cep; }
    public void setCep(String cep) { Cep = cep; }
    public String getRua() { return Rua; }
    public void setRua(String rua) { Rua = rua;}
    public String getBairro() { return Bairro; }
    public void setBairro(String bairro) { Bairro = bairro;}
    public String getGrupo() { return Grupo; }
    public void setGrupo(String grupo) { Grupo = grupo; }
}
