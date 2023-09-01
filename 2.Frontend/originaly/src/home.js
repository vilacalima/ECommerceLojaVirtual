import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
          <Link to="/listarUsuarios" href="listarUsuarios">Lista Usuário</Link>
          <Link to="/listarUsuariosAdmin" href="listarUusariosAdmin">Lista Usuário Admin</Link>
          <Link to="/listarProdutos" href="listarProdutos" disabled={true} >Lista Produto</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
