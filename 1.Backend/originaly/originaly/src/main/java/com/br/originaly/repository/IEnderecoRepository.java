package com.br.originaly.repository;

import com.br.originaly.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface IEnderecoRepository extends JpaRepository<Endereco, Long> {
}
