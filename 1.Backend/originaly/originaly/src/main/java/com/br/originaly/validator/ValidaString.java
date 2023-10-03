package com.br.originaly.validator;

import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class ValidaString {

    /**
     * Divide a string em palavras usando espaços em branco como delimitador
     * Conta o número de palavras com pelo menos três letras
     * Verifica se há pelo menos duas palavras válidas
     * @param text
     * @return
     * */
    public boolean validateText(String text) {
        if (text == null) {
            return false;
        }

        String[] words = text.split("\\s+");

        long validWordCount = Arrays.stream(words)
                .filter(word -> word.length() >= 3)
                .count();

        return validWordCount >= 2;
    }
}
