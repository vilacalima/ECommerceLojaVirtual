package com.br.originaly.record;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record UpdateProdutoRecord(int id,
                                  String nome,
                                  String descricao,
                                  int quantidade,
                                  double valor,
                                  boolean ativo,
                                  double avaliacao) { }
