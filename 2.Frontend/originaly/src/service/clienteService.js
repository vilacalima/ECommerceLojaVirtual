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

    /**
     * Envia um novo cliente para o banco de dados
     * @param {*} dto 
     * @returns 
     */
    newCLiente: async (dto) => {
        try {
            const response = await axios.post(`http://localhost:8080/cliente/create`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Envia um novo cliente para o banco de dados
     * @param {*} dto 
     * @returns 
     */
    updateDadosPessoais: async (dto) => {
        try {
            const response = await axios.post(`http://localhost:8080/cliente/updateDadosPessoais`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Retorna Um objeto de Cliente do banco de dados
     * @param {*} email
     * @returns 
     */
    getClientByEmail: async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/cliente/getCliente/${email}`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Envia um novo endereço para o banco de dados
     * @param {*} idCliente 
     * @param {*} dto 
     * @returns 
     */
    newAddress: async (email, dto) => {
        try {
            const response = await axios.post(`http://localhost:8080/cliente/newAddress/${email}`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Envia uma exclusão de cliente no banco de dados
     * @param {*} idCliente 
     * @returns 
     */
    removeCliente: async (idCliente) => {
        try {
          const response = await axios.put(`http://localhost:8080/cliente/deleteClient/${idCliente}`);
          console.log('Dados enviados com sucesso: ', response.data);
            
          return response.data;
            
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }
    },

    verificarEmailExistente: async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/cliente/verificarEmail/${email}`);
            console.log('Dados enviados com sucesso: ', response.data);

            return response.data;

        } catch (error) {
          console.error('Erro ao verificar email:', error);
          return true;
        }
    }
};

export default ClienteService;