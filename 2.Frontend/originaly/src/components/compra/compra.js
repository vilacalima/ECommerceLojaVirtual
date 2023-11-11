import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './compra.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';
import ProductRating from './productRating.js';
import CarrinhoService from '../../service/carrinhoService.js';
import CalculadoraService from '../../service/calculadora/calculadoraService.js';
import Response from '../util/response.js'
import PadraoHeader from '../header/padraoHeader.js';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [responseApi, setResponseApi] = useState();
  const [mostrar, setMostrar] = useState(false);
  

  // Adicionar o estado para a quantidade do produto
  const [quantity, setQuantity] = useState(1);

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
    }
  }, [productId]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const buttonText = 'Comprar ';

  const handleAddToCart = async (event) => {
    event.preventDefault();

    try {
      setIsButtonDisabled(true);

      if (product) {
        
        let precoTotal = CalculadoraService.calculatePrecoTotal(quantity, product.valor);
        const usuario = localStorage.getItem("usuario");
        let saveUsuario = '';

        if (usuario){
          const usuarioParse = JSON.parse(usuario);
          saveUsuario = usuarioParse.email;
        } else{
          saveUsuario = 'Usuario_nao_logado';
        }

        const carrinho = {
          emailCliente: saveUsuario,
          idProduto: productId,
          quantidade: quantity,
          precoUnitario: product.valor,
          precoTotal: precoTotal
        }

        const saveCompra = await CarrinhoService.saveCarrinhoTemporario(carrinho);

        setResponseApi({ isSucessa: saveCompra.isSuccess, message: saveCompra.message})
        setMostrar(true);

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
      <PadraoHeader />
      <Carousel showArrows={true}>
        {Array.isArray(product.file) && product.file.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Imagem do Produto ${index}`} className="image" />
          </div>
        ))}
      </Carousel>
      <div className="product-info1">
        <div className='compra-item-descricao'>
          <h3>{product.nome}</h3>
          <ProductRating rating={product.avaliacao} />
          <p>{product.descricao}</p>
          <p>R$: {product.valor}</p>
        </div>
        

        <div className='compra-item-botao'>
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
        
        {mostrar && (
            <Response isSuccess={responseApi.isSuccess} message={responseApi.message} rotaSucess={''} rotaNotSucess={`compra/${product.id}`}/>
          )}
       
      </div>
    </div>
  );
}

export default ProductPage;
