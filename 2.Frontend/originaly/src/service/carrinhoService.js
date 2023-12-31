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

    updateQuantidadeCarrinhoTemporario: async (id, quantidade) => {
        try {
            const response = await axios.put(`http://localhost:8080/carrinho/updateQuantidadeCarrinho/${id}/${quantidade}`, id, quantidade);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },

    /**
     * Atualiza a situação de um pedido
     * @param id
     * @param situacao
     */
    updateSitucaoPedido: async (id, situacao) => {
        try {
            const response = await axios.put(`http://localhost:8080/carrinho/updateSitucaoPedido/${id}/${situacao}`);          
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

    getPedidoCliente: async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/carrinho/getPedidoCliente/${email}`);          
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
    },

    /***
     * Retorna todos os pedidos ordenados pela data 
     */
    getAllPedidoOrderByDate: async () => {
        try {
            const response = await axios.get(`http://localhost:8080/carrinho/getAllPedidoOrderByDate`);          
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    },
}

export default CarrinhoService;