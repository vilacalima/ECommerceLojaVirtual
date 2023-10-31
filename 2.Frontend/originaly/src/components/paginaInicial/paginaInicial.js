import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './paginaInicial.css';
import ProdutoService from '../../service/produtoService';
import logo from '../../images/logo.jpg';
import { useHistory, Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
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
      usuarioLogado();
      itensCarrinho();   
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que quer sair?');

    if (confirmLogout) {
      localStorage.removeItem('usuario');
      history.push('/login'); // Redireciona usando o useHistory
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
          <a href="/login"> • 👤 Login</a>
          <a href="#"> • 🛒 Carrinho ({cartCount})</a> {/* Adicionado o contador de carrinho */}
          <a href="/cadastrarCliente"> • Cadastrar</a>
          {isAuthenticated && <a href='/perfil'> • Perfil</a>}
          {isAuthenticated && <Link onClick={handleLogout}> • Logout</Link>}
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
                  <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
                  <button onClick={() => removeFromCart(product)}>Remover do Carrinho</button>
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
