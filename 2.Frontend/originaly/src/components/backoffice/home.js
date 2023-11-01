import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './home.css';
import axios from 'axios';

function Home() {
  const { ativo } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');

    if (userToken == null) {
      history.push(`/login`);
    } else {
      setIsButtonDisabled(ativo === 'true');
    }
  }, [ativo]);

  return (
    <div className="container">
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
          <Link
            to="/listarUsuarios"
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
