package com.br.originaly.repository;

import com.br.originaly.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface IProdutoRepository extends JpaRepository<Produto, Long> {

}
