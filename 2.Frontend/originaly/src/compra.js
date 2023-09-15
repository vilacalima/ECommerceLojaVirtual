import React, { useState, useEffect } from 'react';
import './compra.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductPage() {
  const [product, setProduct] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Fazer uma solicitação HTTP para buscar informações do produto
    fetch('/api/produto') // Certifique-se de que a rota está correta
      .then((response) => response.json())
      .then((data) => {
        setProduct(data); // Atualize o estado com os dados do produto
        setIsButtonDisabled(false); // Habilite o botão após carregar os dados
      })
      .catch((error) => {
        console.error('Erro ao buscar informações do produto:', error);
      });
  }, []);

  return (
    <div className="product-container">
      <Carousel>
        {/* Renderize as imagens do produto aqui */}
      </Carousel>
      <div className="product-info">
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <h3>Avaliação: {product.avaliacao}</h3>
        <p>Por: R$ {product.preco}</p>
        <button id="comprar-button" disabled={isButtonDisabled}>
          Comprar 🛒
        </button>
      </div>
    </div>
  );
}

export default ProductPage;

