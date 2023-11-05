import axios from 'axios';

const CarrinhoService = {
    
    /**
     * Retorna a quantidade de itens do carrinho 
    */
    getCount: async () => {
        try{
            const response = await axios.get(`http://localhost:8080/carrinho/getCountCarrinhoTemporario`);          
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados:', error);
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
    }
}

export default CarrinhoService;