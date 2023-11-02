import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './paginaInicial.css';
import ProdutoService from '../../service/produtoService';
import logo from '../../images/logo.jpg';
import { logout } from './authService';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Adicionado o estado cartCount

  const history = useHistory();

  const loadProducts = async () => {
    const products = await ProdutoService.getAllProductAndImage();
    setProducts(products);
  };

  useEffect(() => {
    try {
      loadProducts();
      const quantidade = localStorage.getItem("quantidadeProduto");
      setCartCount(quantidade);
      console.log(quantidade);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que quer sair?');

    if (confirmLogout) {
      localStorage.removeItem('usuario');
      history.push('/login'); // Redireciona usando o useHistory
      Exemplo: window.location.href = '/login';
    }
     
  };

  const addToCart = (product) => {
    // Adicione o produto ao carrinho
    setCartCount(cartCount + 1); // Atualize o estado cartCount
  };

  const removeFromCart = (product) => {
    // Remova o produto do carrinho
    setCartCount(cartCount - 1); // Atualize o estado cartCount
  };

  const groupProducts = (products) => {
    const grouped = [];
    let group = [];
    for (let i = 0; i < products.length; i++) {
      if (i % 4 === 0 && i > 0) {
        grouped.push(group);
        group = [];
      }
      group.push(products[i]);
    }
    if (group.length > 0) {
      grouped.push(group);
    }
    return grouped;
  };

  return (
    <div className="home-page">
      <header className="top-information">
        <img src={logo} className="logo" alt="Logo"></img>
        <div className="user-section">
          <a href="/login">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg> Login</a>

          <a href="#"> Carrinho ({cartCount}) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
</svg></a> {/* Adicionado o contador de carrinho */}

          <a href="/cadastrarCliente">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
</svg> Cadastrar </a>
          <a href='/perfil/:email'> Perfil <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
</svg></a>


          <a href='#' onClick={handleLogout}>  Sair <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg></a>

          {isAuthenticated && <a href='/'> • Meu Endereços</a>}
        </div>
      </header>

      <main>
        <div className="row">
          {groupProducts(products).map((productGroup, index) => (
            <div className="col" key={index}>
              {productGroup.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.primaryFile} alt={product.name} />
                  <h2>{product.nome}</h2>
                  <p>Descrição: {product.descricao}</p>
                  <p>Por: R${product.valor}</p>
                  <a href={`/compra/${product.id}`} className="detail-button">
                    Descrição
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 Originaly. Todos os direitos reservados.</p>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
