package com.br.originaly.validator;

import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class Cryptography {

    /**
     * Cripitografa a senha
     * @param password
     * @return String
     * */
    public String encryptPassword (String password) {
        password = password + "ORIGINALYPI42023";
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    /**
     * Descriptografa a senha
     * @param password
     * @retrun
     * */
    public String decryptPassword (String password){
        String decryptedPassword = new String(Base64.getDecoder().decode(password));
        int size = (decryptedPassword.length() - 9);
        return decryptedPassword.substring(0,size );
    }
}
