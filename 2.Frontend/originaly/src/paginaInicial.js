import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS da biblioteca
import { Carousel } from 'react-responsive-carousel';
import './paginaInicial.css';
import logo from './images/logo.jpg';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/product/getAllProductAndImage') 
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  // Função para dividir a lista de produtos em grupos de até 4
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
  
  // Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage < groupProducts(products).length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedProducts = groupProducts(products);

  return (
    
    <div className="home-page">
      <header className="top-information">
        <img src={logo} className="logo"></img>
        <div className="user-section">
          <a href="#"> • 👤 Login</a>
          <a href="#"> • 🛒 Carrinho</a>
          <a href="#"> • Registrar</a>
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
