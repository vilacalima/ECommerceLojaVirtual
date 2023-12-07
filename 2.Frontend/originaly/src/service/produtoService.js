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

    getImage: async (productId) => {
        try{
            const response = await axios.get(`http://localhost:8080/api/product/getImage/${productId}`)
            return response.data;
        } catch (error){
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    getAllProduct: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/getAllProduct');
            return response.data;
        } catch (error) {
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    getAllProductAndImage: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/getAllProductAndImage');
            return response.data;
        } catch (error) {
            console.error('Erro ao receber dados: ', error);
            throw error; 
        }
    },

    isActive: async (productId, isChecked) => {
        const url = `http://localhost:8080/api/product/produtoAtivo/${productId}/${isChecked}`;

        const response = await fetch(url, {
            method: 'PUT',
        });

        return response;
    },

    updateImage: async (formData) =>{
        try {
            const response = await axios.put(
              'http://localhost:8080/api/product/updateImage',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error('Erro ao enviar dados para a controller:', error);
          }
    }
};

export default ProdutoService;