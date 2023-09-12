package com.br.originaly.service;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.charset.StandardCharsets;
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
        Blob blob = bucket.get("f904f2ce-8ec9-45ae-8317-dbc26cb9c16d_teste.png");
        if (blob != null) {
            return blob.getMediaLink();
        } else {
            return null;
        }
    }

    public static void getCredenciais() throws IOException {
        String projectId = "originaly-dfcf1";
        String jsonKeyPath = "C:/Users/robso/workspace/ECommerceLojaVirtual/1.Backend/originaly/originaly/src/main/resources/application_default_credentials.json";

        // Crie uma instância do Storage com autenticação baseada na chave de serviço
        Storage storage = StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(jsonKeyPath)))
                .build()
                .getService();

        // Agora você pode acessar o balde e objetos do Google Cloud Storage
    }

    public static void downloadObjectIntoMemory() throws IOException {

        getCredenciais();

        // Configure o projeto, nome do bucket e nome do objeto
        String projectId = "originaly-dfcf1";
        String bucketName = "originaly-dfcf1.appspot.com"; // Substitua pelo nome do seu balde
        String objectName = "https://storage.googleapis.com/download/storage/v1/b/originaly-dfcf1.appspot.com/o/3603ed02-2e32-47d7-a089-d8b724e91310_teste.png?generation=1694124174530913&alt=media";

        // Crie uma instância do Storage com as configurações do projeto
        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        // Obtenha o balde
        Bucket bucket = storage.get(bucketName);

        // Verifique se o balde e o objeto existem antes de tentar baixar
        if (bucket != null) {
            BlobId blobId = BlobId.of(bucketName, objectName);
            Blob blob = storage.get(blobId);

            if (blob != null) {
                // Leia o conteúdo do objeto em um array de bytes
                byte[] content = blob.getContent();

                // Converta os bytes em uma String UTF-8 e imprima
                System.out.println("O conteúdo do objeto " + objectName + " do balde " + bucketName + " é: " + new String(content, StandardCharsets.UTF_8));
            } else {
                System.out.println("O objeto " + objectName + " não foi encontrado no balde " + bucketName);
            }
        } else {
            System.out.println("O balde " + bucketName + " não foi encontrado no projeto " + projectId);
        }
    }

}
