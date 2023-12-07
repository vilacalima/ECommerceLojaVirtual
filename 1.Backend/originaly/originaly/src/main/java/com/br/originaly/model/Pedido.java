package com.br.originaly.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;


@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "id")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "id_cliente")
    private int idCliente;
    @Column(name = "opcao_pagamento")
    private int opcaoPagamento;
    @Column(name = "subtotal")
    private double subtotal;
    @Column(name = "opcao_frete")
    private int opcaoFrete;
    @Column(name = "situacao")
    private int situacao;
    @Column(name = "data")
    private Date data;
    @Column(name = "valor_frete")
    private double valorFrete;
    @Column(name = "id_endereco")
    private int idEndereco;

    public Pedido(int id, int opPagamento, double total, int frete, int situacaoVenda, Date data, int idEndereco, double valorFrete){
        this.idCliente = id;
        this.opcaoPagamento = opPagamento;
        this.subtotal = total;
        this.opcaoFrete = frete;
        this.situacao = situacaoVenda;
        this.data = data;
        this.idEndereco = idEndereco;
        this.valorFrete = valorFrete;
    }
}
