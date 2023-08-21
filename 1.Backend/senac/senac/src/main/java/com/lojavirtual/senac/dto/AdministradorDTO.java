package com.lojavirtual.senac.dto;

public class AdministradorDTO {

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
