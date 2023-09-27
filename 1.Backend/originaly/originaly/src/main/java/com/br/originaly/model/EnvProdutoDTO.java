package com.br.originaly.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class EnvProdutoDTO {

    public EnvProdutoDTO(String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, List<String> file, String primaryFile) {
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.file = file;
        this.primaryFile = primaryFile;
    }

    public EnvProdutoDTO(int id, String nome, String descricao, int quantidade, double valor, boolean ativo, double avaliacao, List<String> file, String primaryFile) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.file = file;
        this.primaryFile = primaryFile;
    }

    public EnvProdutoDTO(int id, String nome, String descricao, double valor, boolean ativo, double avaliacao, String primaryFile) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.ativo = ativo;
        this.avaliacao = avaliacao;
        this.primaryFile = primaryFile;
    }

    private int id;
    private String nome;
    private String descricao;
    private int quantidade;
    private double valor;
    private boolean ativo;
    private double avaliacao;
    private List<String> file;
    private String primaryFile;
}
