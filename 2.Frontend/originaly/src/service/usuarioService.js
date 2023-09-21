import axios from 'axios';

const UsuarioService = {

    getAllUser: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getUsuario');
            return response.data;
        } catch (error) {
            console.error('Erro ao receber dados: ', error);
            throw error; // Rejeita a promessa para que o erro seja tratado corretamente
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