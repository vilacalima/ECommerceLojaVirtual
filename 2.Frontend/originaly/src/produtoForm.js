import React, { useState } from 'react';
import './produtoForm.css';

function ProdutoForm() {

  const [product, setProduct] = useState({
    name: 'Digite o nome do produto',
    description: 'Descrição do Produto',
    rating: 3.5,
    price: 50.0,
    stock: 20,
    image: null, // Alterado para uma única imagem em vez de uma array
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setProduct({ ...product, image: URL.createObjectURL(selectedImage) });
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
      // Envie os dados atualizados do produto e imagem para o servidor (backend) aqui
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
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
          {product.image && (
            <div className='image-container'> 
              <img src={product.image} alt="Imagem do Produto" className="image"/>
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        <button type="submit">Salvar Produto</button>
        <button type="button">Cancelar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;

