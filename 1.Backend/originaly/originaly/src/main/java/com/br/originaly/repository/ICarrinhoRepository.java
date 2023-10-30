package com.br.originaly.repository;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ICarrinhoRepository extends JpaRepository<Carrinho, Long> {
}
