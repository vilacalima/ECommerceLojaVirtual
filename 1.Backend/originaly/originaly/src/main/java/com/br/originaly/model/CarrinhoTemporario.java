package com.br.originaly.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "carrinho_temporario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "id")
public class CarrinhoTemporario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "id_produto")
    private int idProduto;
    @Column(name = "email_cliente")
    private String emailCliente;
    @Column(name = "quantidade")
    private int quantidade;
    @Column(name = "preco")
    private double precoUnitario;
    @Column(name = "preco_total")
    private double precoTotal;

    public CarrinhoTemporario(String emailCliente, int idProduto, int quantidade, double precoUnitario, double precoTotal){
        this.emailCliente = emailCliente;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = precoTotal;
    }
}
