import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './backoffice.css';
import axios from 'axios';

function Backoffice(props) {
  // const { ativo } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Em algum componente dentro da rota "/home"
  const ativo = props.location.state.ativo;
  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');

    if (userToken == null) {
      history.push(`/login`);
    } else {
      console.log(ativo);
      setIsButtonDisabled(ativo === 'true');
    }
  }, [ativo]);

  return (
    <div className="container">
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
        {!isButtonDisabled && 
          <Link
            to="/listarUsuarios"
            className={`button ${!isButtonDisabled ? 'disabled' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            Lista Usuário Admin
          </Link>
        }
        {!isButtonDisabled && 
          <Link
            to="/listarProdutos"
            className={`button ${!isButtonDisabled ? 'disabled' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            Lista Produto
          </Link>
        }
          <Link 
            to="/listarProdutosEstoquista" 
            className="button"
          >
            Lista Produto Estoquista
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Backoffice;
