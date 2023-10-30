package com.br.originaly.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "carrinho")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "id")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "id_pedido")
    private int idPedido;
    @Column(name = "id_produto")
    private int idProduto;
    @Column(name = "quantidade")
    private int quantidade;
    @Column(name = "preco")
    private double precoUnitario;
    @Column(name = "preco_total")
    private double precoTotal;

    public Carrinho(int idPedido, int idProduto, int quantidade, double precoUnitario, double precoTotal){
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = precoTotal;
    }
}
