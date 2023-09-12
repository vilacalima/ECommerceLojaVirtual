import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './compra.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap


function ProductPage() {
    return (
      <div className="product-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
               src="/2.Frontend/originaly/src/images/teste.jpg"
              alt="Produto 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/2.Frontend/originaly/src/images/teste.jpg"
              alt="Produto 2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/2.Frontend/originaly/src/images/teste.jpg"
              alt="Produto 3"
            />
          </Carousel.Item>
        </Carousel>
        <div className="product-info">
          <h2>Colar de Pérolas </h2>
          <p>
           Colar de Perólas puro, moderno, elegante e sofisticado.
            Produto importado.
          </p>
          <h3>Avaliação: ★★★★☆</h3>
          <p>Por : R$ 399,99</p>
          <button id="comprar-button" disabled>Comprar 🛒</button>
        </div>
      </div>
    );
  }
  
  export default ProductPage;
