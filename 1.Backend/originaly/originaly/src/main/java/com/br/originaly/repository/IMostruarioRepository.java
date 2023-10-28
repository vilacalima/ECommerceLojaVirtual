package com.br.originaly.repository;

import com.br.originaly.model.Monstruario;
import com.br.originaly.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface IMostruarioRepository extends JpaRepository<Monstruario, Long> {

    List<Monstruario> findByIdProduto(int idProduto);
    List<Monstruario> findListByIdProduto(int idProduto);
    List<Monstruario> findListByIdProdutoAndIdOrdem(int idProduto, int idOrdem);
    Monstruario findByIdProdutoAndIdOrdem(int idProduto, int idOrdem);
    Monstruario getMonstruarioByRota(String rota);
}
