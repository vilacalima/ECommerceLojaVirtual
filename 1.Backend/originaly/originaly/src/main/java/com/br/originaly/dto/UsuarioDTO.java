package com.br.originaly.dto;

import lombok.ToString;

@ToString
public class UsuarioDTO {

    public int Id;
    public String Nome;
    public String Cpf;
    public String Email;
    public boolean Ativo;
    public String Grupo;

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
