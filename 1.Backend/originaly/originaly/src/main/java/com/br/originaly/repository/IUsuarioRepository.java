package com.br.originaly.repository;

import com.br.originaly.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario getUserByEmailAndSenha(String email, String senha);
}

