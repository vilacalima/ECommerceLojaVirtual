package com.br.originaly.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record UpdateProdutoRecord(int id,
                                  String nome,
                                  String descricao,
                                  int quantidade,
                                  double valor,
                                  boolean ativo,
                                  double avaliacao,
                                  MultipartFile[] files,
                                  MultipartFile filePrimary,
                                  List<String> rotaAntiga,
                                  String rotaFilePrimaryAntiga,
                                  boolean alterfilePrimary,
                                  boolean alterFiles) {

}
