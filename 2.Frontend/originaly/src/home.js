import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

function Home() {
  return (
<div className="container">
  <div className="home-content">
    <h2>Bem-vindo à Página Inicial</h2>
    <div className="home-links">
      <Link to="/listarUsuariosAdmin" className="button">Lista Usuário Admin</Link>
      <Link to="/listarProdutos" className="button" disabled={true}>Lista Produto</Link>
    </div>
  </div>
</div>
  );
}

export default Home;
