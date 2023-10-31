import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './compra.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS da biblioteca
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';


function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]); // Defina como um array, não como um objeto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("usuario");
    if (loggedInUser == null) {
      history.push(`/login`);
    } else {
      axios.get(`http://localhost:8080/api/product/getProductAndAllFileById/${productId}`)
      .then((response) => {
        setProduct(response.data);

        const urls = [];
        urls.push(response.data.primaryFile.url);

        // Adicione as URLs das imagens adicionais (se houverem)
        response.data.file.forEach(file => {
          urls.push(file.url);
        });

        // Defina a constante imageUrls com a array de URLs das imagens
        setImageUrls(urls);

        setLoading(false);
      })
      .catch((error) => {
        setError('Erro ao buscar produtos:' + error.message);
        setLoading(false);
      });
    }
  }, [productId]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const buttonText = 'Comprar 🛒';


  const handleSubmit = async () => {
    try {
      setIsButtonDisabled(true);
  
      // Certifique-se de que o objeto product não está vazio antes de redirecionar
      if (product) {
        history.push('/carrinho', { product });
      } else {
        console.error('Erro: objeto product está vazio.');
      }
    } catch (error) {
      console.error('Erro ao processar a compra:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-container">
      <Carousel showArrows={true} >
          {Array.isArray(product.file) && product.file.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Imagem do Produto ${index}`} className="image" />
            </div>
          ))}
      </Carousel>
      <div className="product-info">
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <h3>{product.avaliacao}</h3>
        <p>Por: {product.valor}</p>
        <button id="comprar-button"  onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
