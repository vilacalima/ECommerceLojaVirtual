import axios from 'axios';

const UsuarioService = {

    newUser: async (userData) => {
        try{
            const response = await axios.post('http://localhost:8080/api/novoUsuario', userData);
            return response.data;
        } catch (error){
            console.error('Erro ao enviar dados:', error);
        }
    },

    getUserById: async (userId) => {
        try{
            const response = await axios.get(`http://localhost:8080/api/getUsuarioById/${userId}`)
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    getAllUser: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getUsuario');
            return response.data;
        } catch (error) {
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    isChecked: async (userId, isChecked) => {
        try {
            const url = `http://localhost:8080/api/usuarioAtivo/${userId}/${isChecked}`;

            const response = await fetch(url, {
                method: 'PUT',
            });

            return response.data;            
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }
    }
};

export default UsuarioService;