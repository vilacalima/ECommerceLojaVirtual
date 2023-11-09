package com.br.originaly.repository;

import com.br.originaly.model.Endereco;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface IEnderecoRepository extends JpaRepository<Endereco, Long> {
    List<Endereco> getEnderecoByIdCliente(int idCliente);
    Endereco getEnderecoByIdClienteAndIsEnderecoEntrega(int idCliente, boolean isEnderecoEntrega);
}
