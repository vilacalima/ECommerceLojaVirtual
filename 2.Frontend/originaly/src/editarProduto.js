import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './produtoForm.css'; // Reutilizamos o CSS do formulário de cadastro
import axios from 'axios';

function EditarProduto() {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    rating: null,
    price: null,
    stock: null,
    image: [],
    filePrimary: null,
    mainImage: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Busque os dados do produto pelo productId
    axios.get(`http://localhost:8080/api/product/getProductById/${productId}`)
      .then(response => {
        const productData = response.data;
        setProduct({
          ...productData,
          name: productData.nome,
          description: productData.descricao,
          rating: productData.avaliacao,
          price: productData.valor,
          stock: productData.quantidade,
          image: productData.file,
          filePrimary: productData.filePrimary,
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do Produto:', error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (acceptedFiles) => {
    const uploadedImages = [...product.images, ...acceptedFiles];
    setProduct({ ...product, images: uploadedImages });
  };

  const handleMainImageSelect = (index) => {
    const selectedImage = product.images[index];
    setProduct({ ...product, mainImage: selectedImage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (product.name.length > 200) {
      validationErrors.name = 'O nome deve ter no máximo 200 caracteres';
    }

    if (product.description.length > 2000) {
      validationErrors.description = 'A descrição deve ter no máximo 2000 caracteres';
    }

    if (Object.keys(validationErrors).length === 0) {
      // Envie os dados atualizados do produto e imagens para o servidor (backend) aqui
      // Use axios ou outra biblioteca para fazer a solicitação ao servidor
      try {
        const response = await axios.put(`http://localhost:8080/api/product/editProduct/${productId}`, product);
        console.log('Dados do produto atualizados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar os dados do Produto:', error);
      }
    } else {
      setErrors(validationErrors);
    }
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
            name="name"
            value={product.name}
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
            name="description"
            value={product.description}
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
            name="rating"
            step="0.5"
            min="0.5"
            max="5"
            value={product.rating}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço do Produto:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Quantidade em Estoque:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            step="1"
            value={product.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagem do Produto:</label>
          {Array.isArray(product.image) && product.image.map((imageUrl, index) => (
            <div key={index} className='image-container'>
              <img src={imageUrl} alt={`Imagem do Produto ${index}`} className="image" />
            </div>
          ))}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagem Principal:</label>
          {product.filePrimary && (
            <div className="image">
              <img
                src={product.filePrimary}
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
