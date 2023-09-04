package com.br.originaly.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Nome;
    private String Descricao;
    private int Quantidade;
    private double Valor;
    private boolean Ativo;
    private double Avaliacao;

    /**
     * Construtor da classe Produto
     * */
    public Produto() {

    }

    public Produto(int id, String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao) {
        Id = id;
        Nome = nome;
        Descricao = descricao;
        Quantidade = quantidade;
        Valor = valor;
        Ativo = ativo;
        Avaliacao = avaliacao;
    }

    public Produto(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao) {
        Nome = nome;
        Descricao = descricao;
        Quantidade = quantidade;
        Valor = valor;
        Ativo = ativo;
        Avaliacao = avaliacao;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getNome() {
        return Nome;
    }

    public void setNome(String nome) {
        Nome = nome;
    }

    public String getDescricao() {
        return Descricao;
    }

    public void setDescricao(String descricao) {
        Descricao = descricao;
    }

    public int getQuantidade() {
        return Quantidade;
    }

    public void setQuantidade(int quantidade) {
        Quantidade = quantidade;
    }

    public double getValor() {
        return Valor;
    }

    public void setValor(double valor) {
        Valor = valor;
    }

    public boolean isAtivo() {
        return Ativo;
    }

    public void setAtivo(boolean ativo) {
        Ativo = ativo;
    }

    public double getAvaliacao() {
        return Avaliacao;
    }

    public void setAvaliacao(double avaliacao) {
        Avaliacao = avaliacao;
    }
}
