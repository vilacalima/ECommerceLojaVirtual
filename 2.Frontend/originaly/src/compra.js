import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './compra.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap


function ProductPage() {
  // Constantes para propriedades do botão de compra
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Botão inicialmente desabilitado
  const buttonText = 'Comprar 🛒';

  // Constantes para URLs das imagens
  const imageUrls = [
    '/2.Frontend/originaly/src/images/teste.jpg',
    '/2.Frontend/originaly/src/images/teste.jpg',
    '/2.Frontend/originaly/src/images/teste.jpg',
  ];

  // Função para lidar com o clique no botão de compra
  const handleSubmit = async () => {
    // Simulação de uma requisição de compra (substitua por lógica real)
    try {
      // Aqui você pode adicionar a lógica de integração com o banco de dados
      // Por exemplo, enviar uma solicitação POST para registrar a compra
      // Utilize a biblioteca axios ou outra de sua preferência
      // Exemplo:
      // const response = await axios.post('/api/compras', { produtoId: 'ID_DO_PRODUTO' });

      // Se a compra for bem-sucedida, você pode habilitar o botão novamente
      setIsButtonDisabled(true);

      // Exemplo de tratamento de resposta
      // if (response.data.success) {
      //   setIsButtonDisabled(true); // Desabilitar o botão após a compra
      //   alert('Compra realizada com sucesso!');
      // } else {
      //   alert('Erro ao processar a compra.');
      // }
    } catch (error) {
      console.error('Erro ao processar a compra:', error);
    }
  };

  return (
    <div className="product-container">
      <Carousel>
        {imageUrls.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={imageUrl} alt={`Produto ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="product-info">
        <h2>Colar de Pérolas</h2>
        <p>Colar de Pérolas puro, moderno, elegante e sofisticado. Produto importado.</p>
        <h3>Avaliação: ★★★★☆</h3>
        <p>Por: R$ 399,99</p>
        <button id="comprar-button" disabled={isButtonDisabled} onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
