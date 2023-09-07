package com.br.originaly.model;

import jakarta.persistence.*;

@Entity
@Table(name = "monstruario")
public class Monstruario {
    @Id
    @Column(name = "id") // Nome da coluna no banco de dados
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_produto")
    private Integer idProduto;

    @Column(name = "rota")
    private String rota;

    @Column(name = "id_ordem")
    private Integer idOrdem;

    public Monstruario() {
    }

    public Monstruario(Integer idProduto, String rota, Integer idOrdem) {
        this.idProduto = idProduto;
        this.rota = rota;
        this.idOrdem = idOrdem;
    }

    // Getters e Setters
    // Certifique-se de que os nomes estejam corretos, como getId, setId, etc.

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Integer idProduto) {
        this.idProduto = idProduto;
    }

    public String getRota() {
        return rota;
    }

    public void setRota(String rota) {
        this.rota = rota;
    }

    public Integer getIdOrdem() {
        return idOrdem;
    }

    public void setIdOrdem(Integer idOrdem) {
        this.idOrdem = idOrdem;
    }
}
