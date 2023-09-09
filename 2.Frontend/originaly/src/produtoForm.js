import React, { useState } from 'react';
import './produtoForm.css';

function ProdutoForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    rating: 0.5,
    price: 0.0,
    stock: 0,
    images: [],
    mainImage: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (acceptedFiles) => {
    const uploadedImages = product.images.concat(acceptedFiles);
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
      // Envie os dados do produto e imagens para o servidor (backend) aqui
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Produto</h2>
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
          <label htmlFor="images">Imagens do Produto:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="main-image">Imagem Principal:</label>
          <select
            id="main-image"
            name="main-image"
            onChange={(e) => handleMainImageSelect(e.target.value)}
            required
          >
            {/* Preencha as opções com base nas imagens carregadas */}
          </select>
        </div>

        <button type="submit">Salvar</button>
        <button type="button">Cancelar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;
