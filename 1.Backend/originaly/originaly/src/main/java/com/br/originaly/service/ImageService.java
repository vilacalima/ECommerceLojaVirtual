package com.br.originaly.service;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    /**
     * Obtém o objeto de armazenamento do Firebase Storage
     * Gera um nome de arquivo único para a imagem (por exemplo, com UUID)
     * Faz o upload da imagem para o Firebase Storage
     * Recupera a URL pública da imagem recém-carregada
     * @return url
     * */
    public String uploadImagem(MultipartFile imagem) throws IOException {

        System.out.println("Entrou no método");

        Bucket bucket = StorageClient.getInstance().bucket();
        String nomeArquivo = UUID.randomUUID().toString() + "_" + imagem.getOriginalFilename();
        Blob blob = bucket.create(nomeArquivo, imagem.getBytes(), imagem.getContentType());
        String url = blob.getMediaLink();

        System.out.println("Enviou");

        return url;
    }

    /**
     * Obtém o objeto de armazenamento do Firebase Storage
     * Recupera a URL pública da imagem
     * @return blob
     * */
    public String getUrlDaImagem(String nomeArquivo) {

        Bucket bucket = StorageClient.getInstance().bucket();

        System.out.println("entrou no método");
        Blob blob = bucket.get(nomeArquivo);
        if (blob != null) {
            return blob.getMediaLink();
        } else {
            return null;
        }
    }

}
