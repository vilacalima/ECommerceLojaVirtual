import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS da biblioteca
import './padraoHeader.css';
import logo from '../../images/logo.jpg';

import { Link, useHistory } from 'react-router-dom';

function PadraoHeader(props) {
  const pedidos = props.pedidos;  
  const history = useHistory();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Tem certeza que quer sair?');

    if (confirmLogout) {
      localStorage.removeItem('usuario');
      history.push('/');
    }
  };
  
  return (
    
    <div className="header-container">
      <header className="header-top-information">
        <a href='/'><img src={logo} className="header-logo" alt='logo'></img></a>
        <div className="header-user-section">
            {pedidos && <Link to="/MeusPedidos"> • Meus Pedidos</Link>}
            <Link onClick={handleLogout}> • Logout</Link>
        </div>
      </header>
    </div>
  );
}

export default PadraoHeader;
