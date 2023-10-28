/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './produtoForm.css';
import axios from 'axios';
import ProdutoService from '../../service/produtoService';

function NovaImagem(props) {
  const { id } = props;
  const [imageUrls, setImageUrls] = useState([]);

  const [product, setProduct] = useState({
    images: [], 
    newImages: [], 
  });

  const [newProduct, setNewProduct] = useState({
    images: [],
  });

  const [deletedImageUrls, setDeletedImageUrls] = useState([]);

  const handleImageDelete = (index) => {
    if (Array.isArray(product.images) && product.images.length > index) {
      const updatedImages = [...product.images];
      updatedImages.splice(index, 1);
      setProduct({ ...product, images: updatedImages });
  
      const updatedUrls = [...imageUrls];
      updatedUrls.splice(index, 1);
      setImageUrls(updatedUrls);
  
      const deletedImage = product.images[index];
      // console.log(deletedImage);
  
      // Certifique-se de que deletedImage.displayImage seja definido
      // if (deletedImage && deletedImage.displayImage) {
        console.log('Deleted Image URL:', deletedImage);
        setDeletedImageUrls([...deletedImageUrls, deletedImage]);
      // }
    }
  };
  
  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    
    const newImages = selectedImages.map((image) => ({
      file: image,
      displayImage: URL.createObjectURL(image),
    }));
  
    setNewProduct({ ...newProduct, images: [...newProduct.images, ...newImages] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await ProdutoService.getImage(id);
        setProduct({ ...product, images: productData });
        // setImageUrls(product); 
        
      } catch (error) {
        console.error('Erro ao buscar dados do Produto:', error);
      }
    };
  
    fetchData(); 
  }, [id]);

  const sendUserData = async () => {    
    try {
      const formData = new FormData();
      formData.append('idProduct', id)
      // formData.append('rotaAntiga', deletedImageUrls.url);
      for (let i = 0; i < deletedImageUrls.length; i++) {
        formData.append('rotaAntiga', deletedImageUrls[i]);
      }

      for (let i = 0; i < newProduct.images.length; i++) {
        formData.append('file', newProduct.images[i].file);
      }

      const response = await ProdutoService.updateImage(formData);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const validationErrors = {};
    
    if (Object.keys(validationErrors).length === 0) {
      
      // try {
      //   const response = await axios.put(`http://localhost:8080/api/product/updateProduct`, product);
      //   console.log('Dados do produto atualizados com sucesso:', response.data);
      // } catch (error) {
      //   console.error('Erro ao atualizar os dados do Produto:', error);
      // }
    } 
  
    sendUserData(product);
  };
    
  return (

  <div className="form-group">
    {/* Selecione as imagens com base nas URLs */}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2>Editar Imagem do Produto:</h2>
        <div className="image-row">
          {product.images.map((imageUrl, index) => (
            <div key={index} className="image-column">
              <img src={imageUrl} alt={`Img do Produto ${index}`} className="image" />
              <button type="button" onClick={() => handleImageDelete(index)}>Excluir</button>
            </div>
          ))}
        </div>
        
      </div>
      <label htmlFor="images">Inserir novas imagens:</label>
      <div className="image-container">
        {newProduct.images.map((image, index) => (
          <div
            key={index}
            className={`image ${image.isPrimary ? 'selected' : ''}`}
          >
            <img src={image.displayImage} alt={`Imagem do Produto ${index}`} />
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
      />
      <button type="submit">Salvar Alterações</button>
    </form>
  </div>        
    
  );
    
}

export default NovaImagem;