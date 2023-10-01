import axios from 'axios';

const ClienteService = {

    /**
     * Retorna Um objeto de CEP do banco de dados
     * @param {*} cep 
     * @returns 
     */
    getCep: async (cep) => {
        try {
            const response = await axios.post(`http://localhost:8080/cep/${cep}`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },
};

export default ClienteService;