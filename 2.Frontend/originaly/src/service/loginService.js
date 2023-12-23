import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginService = {

  getLogin: async (UserDTO) => {
      try {
        const response = await axios.post(`${backendUrl}api/login`, UserDTO);
        console.log('Dados enviados com sucesso: ', response.data);
          
        return response.data;
          
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
  }

};

export default LoginService;