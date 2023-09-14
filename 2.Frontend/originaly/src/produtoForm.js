import React, { useState } from 'react';
import './produtoForm.css';
import axios from 'axios';

function ProdutoForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    rating: null,
    price: null,
    stock: null,
    images: [],
    filePrimary: null,
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    
    const newImages = selectedImages.map((image) => ({
      file: image,
      displayImage: URL.createObjectURL(image),
    }));
  
    setProduct({ ...product, images: [...product.images, ...newImages] });
  };
  

  const toggleIsPrimary = (index) => {
    const updatedImages = [...product.images];

    if (index >= 0 && index < updatedImages.length) {
      const selectedImage = updatedImages[index];
      selectedImage.isPrimary = true;
      setProduct({
        ...product,
        images: updatedImages.filter((_, i) => i !== index),
        filePrimary: selectedImage,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (product.name.length > 200) {
      validationErrors.name = 'O nome deve ter no máximo 200 caracteres';
    }

    if (product.description.length > 2000) {
      validationErrors.description =
        'A descrição deve ter no máximo 2000 caracteres';
    }

    if (!product.filePrimary) {
      validationErrors.primaryImage = 'Selecione uma imagem principal';
    }

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('nome', product.name);
      formData.append('descricao', product.description);
      formData.append('quantidade', product.stock);
      formData.append('valor', product.price);
      formData.append('ativo', true);
      formData.append('avaliacao', product.rating);
            
      // // Anexe as imagens
      // product.images.forEach((image, index) => {
      //   formData.append(`file[${index}]`, image.file, `image${index}.jpg`);
      // });

      // Anexe a imagem principal
      formData.append('filePrimary', product.filePrimary.file, 'primaryImage.jpg');

      formData.append('file', product.filePrimary.file, 'primaryImage.jpg');

      
      try {
        const response = await axios.post(
          'http://localhost:8080/api/product/newProduct',
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
          <label htmlFor="images">Imagens do Produto:</label>
          <div className="image-container">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`image ${image.isPrimary ? 'selected' : ''}`}
              >
                <img src={image.displayImage} alt={`Imagem do Produto ${index}`} />
                <button onClick={() => toggleIsPrimary(index)}>
                  Marcar como principal
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            id="images"
            name="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            required
          />
          {errors.primaryImage && (
            <div className="error">{errors.primaryImage}</div>
          )}
        </div>
        <div className="form-group">
          <label>Imagem Principal:</label>
          {product.filePrimary && (
            <div className="image">
              <img
                src={product.filePrimary.displayImage}
                alt="Imagem Principal"
              />
            </div>
          )}
        </div>
        <button type="submit">Salvar Produto</button>
        <button type="button">Cancelar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;