package com.br.originaly.model;


import jakarta.persistence.*;

import java.util.Date;

public class EnvProdutoDTO {

    public EnvProdutoDTO(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, String file) {
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.file = file;
    }

    private String nome;
    private String descricao;
    private int quantidade;
    private double valor;
    private boolean ativo;
    private double avaliacao;
    private String file;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }



}
