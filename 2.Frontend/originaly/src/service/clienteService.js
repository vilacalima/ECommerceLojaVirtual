import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ClienteService = {

    /**
     * Retorna Um objeto de CEP do banco de dados
     * @param {*} cep 
     * @returns 
     */
    getCep: async (cep) => {
        try {
            const response = await axios.post(`${backendUrl}cep/${cep}`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Retorna um endereço pelo email e ativo
     * @param idCliente
     * @returns
     */
    getAddress: async (email) => {
        try {
            const response = await axios.get(`${backendUrl}cliente/getAddress/${email}`);          
            
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Retorna um endereço pelo email e ativo
     * @param email
     * @returns
     */
    getAllAddress: async (email) => {
        try {
            const response = await axios.get(`${backendUrl}cliente/getAllAddress/${email}`);          
            
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
            const response = await axios.post(`${backendUrl}cliente/create`, dto);          
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
            const response = await axios.post(`${backendUrl}cliente/updateDadosPessoais`, dto);          
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
            const response = await axios.get(`${backendUrl}cliente/getCliente/${email}`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Retorna Um objeto de Cliente do banco de dados
     * @param {*} id
     * @returns 
     */
    getEnderecoById: async (id) => {
        try {
            const response = await axios.get(`${backendUrl}cliente/getAddressById/${id}`);          
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
            const response = await axios.post(`${backendUrl}cliente/newAddress/${email}`, dto);          
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
          const response = await axios.put(`${backendUrl}cliente/deleteClient/${idCliente}`);
          console.log('Dados enviados com sucesso: ', response.data);
            
          return response.data;
            
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }
    },

    /**
     * Verifica se o email existe
     * @param email
     * @returns
     */
    verificarEmailExistente: async (email) => {
        try {
            const response = await axios.get(`${backendUrl}cliente/verificarEmail/${email}`);
            console.log('Dados enviados com sucesso: ', response.data);

            return response.data;

        } catch (error) {
          console.error('Erro ao verificar email:', error);
          return true;
        }
    }
};

export default ClienteService;