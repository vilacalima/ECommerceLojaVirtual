import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './home.css';
import axios from 'axios';

function Home() {
  const { ativo } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(ativo === 'true');
  }, [ativo]);

  return (
    <div className="container">
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
          <Link
            to="/listarUsuariosAdmin"
            className={`button ${isButtonDisabled ? 'disabled' : ''}`}
            onClick={(e) => isButtonDisabled && e.preventDefault()}
          >
            Lista Usuário Admin
          </Link>
          <Link
            to="/listarProdutos"
            className={`button ${isButtonDisabled ? 'disabled' : ''}`}
            onClick={(e) => isButtonDisabled && e.preventDefault()}
          >
            Lista Produto
          </Link>
          <Link to="/listarProdutosEstoquista" className="button">
            Lista Produto Estoquista
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
