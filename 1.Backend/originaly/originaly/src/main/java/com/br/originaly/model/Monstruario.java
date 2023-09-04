package com.br.originaly.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Monstruario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int IdProduto;
    private String Rota;
    private int IdOrdem;

    public Monstruario() {
    }

    public Monstruario(int idProduto, String rota, int idOrdem) {
        IdProduto = idProduto;
        Rota = rota;
        IdOrdem = idOrdem;
    }

    public Monstruario(int id, int idProduto, String rota, int idOrdem) {
        Id = id;
        IdProduto = idProduto;
        Rota = rota;
        IdOrdem = idOrdem;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getIdProduto() {
        return IdProduto;
    }

    public void setIdProduto(int idProduto) {
        IdProduto = idProduto;
    }

    public String getRota() {
        return Rota;
    }

    public void setRota(String rota) {
        Rota = rota;
    }

    public int getIdOrdem() {
        return IdOrdem;
    }

    public void setIdOrdem(int idOrdem) {
        IdOrdem = idOrdem;
    }
}
