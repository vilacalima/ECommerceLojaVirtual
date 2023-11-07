package com.br.originaly.repository;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.CarrinhoTemporario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ICarrinhoTemporarioRepository extends JpaRepository<CarrinhoTemporario, Long> {
    List<CarrinhoTemporario> getCarrinhoTemporarioByEmailCliente(String emailCliente);
    long countByEmailCliente(String emailCliente);
}
