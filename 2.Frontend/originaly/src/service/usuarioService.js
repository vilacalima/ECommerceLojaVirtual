import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UsuarioService = {

    newUser: async (userData) => {
        try{
            const response = await axios.post(`${backendUrl}api/novoUsuario`, userData);
            return response.data;
        } catch (error){
            console.error('Erro ao enviar dados:', error);
        }
    },

    getUserById: async (userId) => {
        try{
            const response = await axios.get(`${backendUrl}api/getUsuarioById/${userId}`)
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    getAllUser: async () => {
        try {
            const response = await axios.get(`${backendUrl}api/getUsuario`);
            return response.data;
        } catch (error) {
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    isChecked: async (userId, isChecked) => {
        try {
            const url = `${backendUrl}api/usuarioAtivo/${userId}/${isChecked}`;

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