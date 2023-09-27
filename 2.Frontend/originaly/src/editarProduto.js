import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProdutoService from './service/produtoService';
import './produtoForm.css'; // Reutilizamos o CSS do formulário de cadastro
import axios from 'axios';

function EditarProduto() {
  const { productId } = useParams();

  const [product, setProduct] = useState({
  
  });

  const [errors, setErrors] = useState({});

  //Serviço que chama a função no para pegar dados do produto no backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await ProdutoService.getProdutoById(productId);
        setProduct(product);
      } catch (error) {
        console.error('Erro ao buscar dados do Produto:', error);
      }
    };
  
    fetchData(); 
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (acceptedFiles) => {
    const uploadedImages = [...product.images, ...acceptedFiles];
    setProduct({ ...product, images: uploadedImages });
  };
  
  const sendUserData = async (userData) => {    
    try {
      const response = await axios.put("http://localhost:8080/api/product/updateProduct", userData);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const [newProduct, setNewProduct] = useState({
    nome: '',
    descricao: '',
    quantidade: null,
    valor: null,
    ativo: null,
    avaliacao: null,
    files: [],
    filePrimary: null,
    rotaAntiga: [],
    rotaFilePrimaryAntiga: '',
    alterfilePrimary: null,
    alterFiles: null
  });

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const validationErrors = {};
  
    if (product.nome.length > 200) {
      validationErrors.name = 'O nome deve ter no máximo 200 caracteres';
    }
  
    if (product.descricao.length > 2000) {
      validationErrors.description = 'A descrição deve ter no máximo 2000 caracteres';
    }
  
    if (product.file && Array.isArray(product.file) && product.file.length > 0) {
      // se ouver imagens instanciar variavel files e colocar rota da imagem antiva na propriedade rotaFileAntiga
    } else {
      // Se não houver imagens selecionadas vamos deixar em branco e continuar
    }
  
    if (Object.keys(validationErrors).length === 0) {
      // Envie os dados atualizados do produto e imagens para o servidor (backend) aqui
      // Use axios ou outra biblioteca para fazer a solicitação ao servidor

      //Aqui vamos instanciar todo o objeto novo e mapear seus campos
      try {
        const response = await axios.put(`http://localhost:8080/api/product/updateProduct`, product);
        console.log('Dados do produto atualizados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar os dados do Produto:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  
    sendUserData(product);
  };
  
  

  return (
    <div className="container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            name="nome"
            value={product.nome}
            onChange={handleInputChange}
            maxLength="200"
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição do Produto:</label>
          <textarea
            id="description"
            name="descricao"
            value={product.descricao}
            onChange={handleInputChange}
            maxLength="2000"
            required
          ></textarea>
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="rating">Avaliação do Produto:</label>
          <input
            type="number"
            id="rating"
            name="avaliacao"
            step="0.5"
            min="0.5"
            max="5"
            value={product.avaliacao}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço do Produto:</label>
          <input
            type="number"
            id="price"
            name="valor"
            step="0.01"
            value={product.valor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Quantidade em Estoque:</label>
          <input
            type="number"
            id="stock"
            name="quantidade"
            step="1"
            value={product.quantidade}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagem do Produto:</label>
          {Array.isArray(product.file) && product.file.map((fileUrl, index) => (
            <div key={index} className='image-container'>
              <img src={fileUrl} alt={`Imagem do Produto ${index}`} className="image" />
            </div>
          ))}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-group">
          <label>Imagem Principal:</label>
          {product.primaryFile && (
            <div className="image">
              <img
                src={product.primaryFile}
                alt="Imagem Principal"
              />
            </div>
          )}
        </div>


        <button type="submit">Salvar Alterações</button>
        <button type="button">Cancelar</button>
      </form>
    </div>
  );
}

export default EditarProduto;
