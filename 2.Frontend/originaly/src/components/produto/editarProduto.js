import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProdutoService from '../../service/produtoService';
import { useHistory } from 'react-router-dom';
import './produtoForm.css'; // Reutilizamos o CSS do formulário de cadastro
import axios from 'axios';
import NovaImagem from './novaImagem';
import PadraoHeader from '../header/padraoHeader';

function EditarProduto() {
  const { productId } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState({
    images: [], 
    newImages: [],
    filePrimary: null,
  });

  const [imageUrls, setImageUrls] = useState([]); // Crie um estado para armazenar as URLs das imagens
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //Serviço que chama a função no para pegar dados do produto no backend
  useEffect(() => {
    const loggedInUser = localStorage.getItem("usuario");
    if (loggedInUser == null) {
      history.push(`/login`);
    } else{
      const fetchData = async () => {
        try {
          const product = await ProdutoService.getProdutoById(productId);
          setProduct(product);
  
          const urls = Array.isArray(product.file)
          ? product.file.map((file) => file)
          : [];
  
          setImageUrls(urls);
        } catch (error) {
          console.error('Erro ao buscar dados do Produto:', error);
        }
      };
    
      fetchData(); 
    } 
  }, [productId]);

  const sendUserData = async (userData) => {    
    try {
      const response = await axios.put("http://localhost:8080/api/product/updateProduct", userData);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

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
  
  const handleCancelar = () => {
    const confirmacao = window.confirm('Você tem certeza que deseja cancelar?');

    if (confirmacao) {
      // Redireciona para a página /home se o usuário confirmar
      history.push(`/home/${true}`);
    }
    // Se o usuário não confirmar, permanece na página
  };


  return (
    <div className='listar-produtos-container'>
      <PadraoHeader />
      <div className="salvar-produto-container">
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
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={handleCancelar}>Cancelar</button>
        </form>

        <NovaImagem id={productId}/>
      </div>
    </div>  
  );
}

export default EditarProduto;
