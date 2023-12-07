import axios from 'axios';

const LoginService = {

  getLogin: async (UserDTO) => {
      try {
        const response = await axios.post('http://localhost:8080/api/login', UserDTO);
        console.log('Dados enviados com sucesso: ', response.data);
          
        return response.data;
          
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
  }

};

export default LoginService;