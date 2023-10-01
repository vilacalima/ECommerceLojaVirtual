package com.br.originaly.service;

import com.br.originaly.model.ViaCEPResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCEPService {

    private static final String VIA_CEP_URL = "https://viacep.com.br/ws/";

    public ViaCEPResponse consultarCEP(String cep) {
        String url = VIA_CEP_URL + cep + "/json";
        RestTemplate restTemplate = new RestTemplate();
        ViaCEPResponse response = restTemplate.getForObject(url, ViaCEPResponse.class);
        return response;
    }
}

