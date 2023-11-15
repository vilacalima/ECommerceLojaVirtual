import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS da biblioteca
import './paginaInicial.css';
import ProdutoService from '../../service/produtoService';
import CarrinhoService from  '../../service/carrinhoService';
import logo from '../../images/logo.jpg';
import { useHistory, Link } from 'react-router-dom';
import Backoffice from '../backoffice/backoffice';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAdm, setIsAdm] = useState(false);

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

  const usuarioLogado = () => {
      const usuario = localStorage.getItem("usuario");
      if(usuario){
        setIsAuthenticated(true);
      }
  }

  const itensCarrinho = async () => {
    let user = '';
    const usuario = localStorage.getItem("usuario");
    const usuarioParse = JSON.parse(usuario);

    if(usuarioParse != null){
      if(usuarioParse.tipo === 'administrador'){
        setIsAdm(true);
      }
      user = usuarioParse.email;
    } else{
      user = 'Usuario_nao_logado';
    }
    
    const response = await CarrinhoService.getCount(user);
    setCartCount(response);
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que quer sair?');

    if (confirmLogout) {
      localStorage.removeItem('usuario');
      history.push('/login');
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

  const handlerPagAdm = () => {
    history.push('/backoffice');
  };

  return (
    <div className="home-page">
      <header className="top-information">
        <img src={logo} className="logo" alt="Logo"></img>
        <div className="user-section">
          <a href="/login"> • 👤 Login</a>
          {isAuthenticated && isAdm === false && <a href="/carrinho"> • 🛒 Carrinho ({cartCount})</a>} {/* Adicionado o contador de carrinho */}
          {isAuthenticated && isAdm === false && <a href="/cadastrarCliente"> • Cadastrar</a>}
          {isAuthenticated && isAdm === false && <a href='/perfil'> • Perfil</a>}
          {isAuthenticated && isAdm && <Link onClick={handlerPagAdm}> • Administrador</Link>}
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
                  <h2 className='pagina-inicial-detail'>{product.nome}</h2>
                  <p className='pagina-inicial-detail'>Descrição: {product.descricao}</p>
                  <p>Por: R${product.valor}</p>
                  <a href={`/compra/${product.id}`} className="pagina-inicial-detail-button">
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
