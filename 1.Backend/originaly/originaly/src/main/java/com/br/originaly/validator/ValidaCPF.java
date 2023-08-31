package com.br.originaly.validator;

import org.springframework.stereotype.Component;

@Component
public class ValidaCPF {

    /**
     * Método para validar CPF
     * @param cpf String
     * @return true or false
     * */
    public static boolean validarCPF(String cpf) {

        if(cpf == null){
            return false;
        }

        cpf = cpf.replaceAll("[^0-9]", "");

        if (cpf.length() != 11) {
            return false;
        }

        boolean verificarDigitosIguais = true;
        for (int i = 1; i < 11; i++) {
            if (cpf.charAt(i) != cpf.charAt(0)) {
                verificarDigitosIguais = false;
                break;
            }
        }
        if (verificarDigitosIguais) {
            return false;
        }

        int soma = 0;
        for (int i = 0; i < 9; i++) {
            int digito = Integer.parseInt(cpf.substring(i, i + 1));
            soma += digito * (10 - i);
        }
        int primeiroDigito = 11 - (soma % 11);
        if (primeiroDigito >= 10) {
            primeiroDigito = 0;
        }

        soma = 0;
        for (int i = 0; i < 10; i++) {
            int digito = Integer.parseInt(cpf.substring(i, i + 1));
            soma += digito * (11 - i);
        }
        int segundoDigito = 11 - (soma % 11);
        if (segundoDigito >= 10) {
            segundoDigito = 0;
        }

        if (primeiroDigito == Integer.parseInt(cpf.substring(9, 10)) && segundoDigito == Integer.parseInt(cpf.substring(10))) {
            return true;
        } else {
            return false;
        }
    }
}
