package com.br.originaly.repository;

import com.br.originaly.model.Cliente;
import com.br.originaly.model.Monstruario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByEmail(String email);
    Cliente findByCpf(String cpf);
    Cliente getClienteByEmailAndSenha(String email, String senha);
}
