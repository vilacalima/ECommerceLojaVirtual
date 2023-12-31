package com.br.originaly.model;


import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "quantidade")
    private int quantidade;
    @Column(name = "valor")
    private double valor;
    @Column(name = "ativo")
    private boolean ativo;
    @Column(name = "avaliacao")
    private double avaliacao;
    @Column(name = "update_at")
    private Date updateAt;

    /**
     * Construtor da classe Produto
     * */
    public Produto() {

    }

    public Produto(int id, String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, Date updateAt) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.updateAt = updateAt;
    }

    public Produto(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, Date updateAt ) {
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.updateAt = updateAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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
    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }
}
