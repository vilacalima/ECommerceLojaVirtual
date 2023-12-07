package com.br.originaly.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "endereco")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "id")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "id_cliente")
    private int idCliente;
    @Column(name = "rua")
    private String rua;
    @Column(name = "numero")
    private String numero;
    @Column(name = "complemento")
    private String complemento;
    @Column(name = "bairro")
    private String bairro;
    @Column(name = "cidade")
    private String cidade;
    @Column(name = "cep")
    private String cep;
    @Column(name = "is_faturamento")
    private boolean isFaturamento;
    @Column(name = "is_endereco_padrao")
    private boolean isEnderecoPadrao;
    @Column(name = "is_endereco_entrega")
    private boolean isEnderecoEntrega;
    @Column(name = "is_ativo")
    private boolean isAtivo;

    public Endereco(int idCliente, String rua, String numero, String complemento, String bairro, String cidade, String cep, boolean isFaturamento, boolean isEnderecoPadrao, boolean isEnderecoEntrega, boolean isAtivo) {
        this.idCliente = idCliente;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.isFaturamento = isFaturamento;
        this.isEnderecoPadrao = isEnderecoPadrao;
        this.isEnderecoEntrega = isEnderecoEntrega;
        this.isAtivo = isAtivo;
    }

    public Endereco(String rua, String numero, String complemento, String bairro, String cidade, String cep, boolean isFaturamento, boolean isEnderecoPadrao, boolean isEnderecoEntrega, boolean isAtivo) {
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.isFaturamento = isFaturamento;
        this.isEnderecoPadrao = isEnderecoPadrao;
        this.isEnderecoEntrega = isEnderecoEntrega;
        this.isAtivo = isAtivo;
    }
}
