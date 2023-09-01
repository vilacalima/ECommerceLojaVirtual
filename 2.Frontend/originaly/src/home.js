import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
          <Link to="/listarUsuarios">Lista Usuário</Link>
          <Link to="/listarUsuariosAdmin">Lista Usuário Admin</Link>
          <Link to="/listarProdutos">Lista Produto</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;