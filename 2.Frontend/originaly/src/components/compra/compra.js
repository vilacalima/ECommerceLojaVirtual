import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './compra.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';
import ProductRating from './productRating.js';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  // Adicionar o estado para a quantidade do produto
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/product/getProductAndAllFileById/${productId}`)
    
    .then((response) => {
      setProduct(response.data);

      const urls = [];
      urls.push(response.data.primaryFile.url);

      response.data.file.forEach(file => {
        urls.push(file.url);
      });

      setImageUrls(urls);

      setLoading(false);
    })
    .catch((error) => {
      setError('Erro ao buscar produtos:' + error.message);
      setLoading(false);
    });
    
  }, [productId]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const buttonText = 'Comprar ';

  const handleAddToCart = async () => {
    try {
      setIsButtonDisabled(true);

      if (product) {
        // Cria um objeto do produto com quantidade
        const productWithQuantity = { ...product, quantity };

        // Define o produto no armazenamento local
        localStorage.setItem('carrinho', JSON.stringify(productWithQuantity));

        history.push('/carrinho', { product: productWithQuantity });
      } else {
        console.error('Erro: objeto product está vazio.');
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="produto-container">
      <Carousel showArrows={true}>
        {Array.isArray(product.file) && product.file.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Imagem do Produto ${index}`} className="image" />
          </div>
        ))}
      </Carousel>
      <div className="product-info1">
        <h2>{product.nome}</h2>
        <ProductRating rating={product.avaliacao} />
        <p>{product.descricao}</p>
        <p>R$: {product.valor}</p>
        
        {/* Botões para ajustar a quantidade */}
        <div className="quantity-controls">
          <button onClick={handleDecrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrementQuantity}>+</button>
        </div>
        
        <button id="adicionar-carrinho-button" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
        <button id="comprar-button" onClick={handleAddToCart}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
