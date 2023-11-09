import axios from 'axios';

const CarrinhoService = {
    
    /**
     * Retorna a quantidade de itens do carrinho 
    */
    getCount: async (email) => {
        try{
            const response = await axios.get(`http://localhost:8080/carrinho/getCountCarrinhoTemporario/${email}`);          
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados:', error);
            throw error;
        }
    },

    save: async (dto) => {
        try {
            const response = await axios.post(`http://localhost:8080/carrinho/save`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    saveCarrinhoTemporario: async (dto) => {
        try {
            const response = await axios.post(`http://localhost:8080/carrinho/saveCarrinhoTemporario`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    updateCarrinhoTemporario: async (dto) => {
        try {
            const response = await axios.put(`http://localhost:8080/carrinho/updateCarrinhoTemporario`, dto);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    getCarrinhoTemporario: async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/carrinho/getCarrinhoTemporario/${email}`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    deleteItemCarrinhoTemporario: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/carrinho/deleteItem/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    }
}

export default CarrinhoService;