package com.br.originaly.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonstruarioRepository {

    private final IMostruarioRepository _mostruarioRepository;

    @Autowired
    public MonstruarioRepository(IMostruarioRepository mostruarioRepository){
        _mostruarioRepository = mostruarioRepository;
    }

}
