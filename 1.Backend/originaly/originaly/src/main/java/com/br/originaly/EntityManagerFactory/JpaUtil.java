package com.br.originaly.EntityManagerFactory;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

public class JpaUtil {
    private static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("persistence.xml");

    public static EntityManagerFactory getEntityManagerFactory() {
        return entityManagerFactory;
    }
}

