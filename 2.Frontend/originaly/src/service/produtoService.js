import axios from 'axios';

const ProdutoService = {

    getProdutoById: async (productId) => {
        try{
            const response = await axios.get(`http://localhost:8080/api/product/getProductById/${productId}`)
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    
};

export default ProdutoService;