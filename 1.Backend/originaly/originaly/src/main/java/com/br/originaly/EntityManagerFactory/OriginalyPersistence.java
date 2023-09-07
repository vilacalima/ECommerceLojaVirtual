package com.br.originaly.EntityManagerFactory;

import com.br.originaly.EntityManagerFactory.JpaUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import javax.xml.stream.events.EntityDeclaration;

public class OriginalyPersistence {
    private EntityManagerFactory entityManagerFactory = JpaUtil.getEntityManagerFactory();

    public void salvarEntidade(EntityDeclaration entidade) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(entidade);
            entityManager.getTransaction().commit();
        } finally {
            entityManager.close();
        }
    }
}
