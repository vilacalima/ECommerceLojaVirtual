import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './backoffice.css';
import axios from 'axios';
import PadraoHeader from '../header/padraoHeader';

function Backoffice() {
  // const { ativo } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Em algum componente dentro da rota "/home"
  // const ativo = props.ativo;
  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');
    const ativoFromStorage = localStorage.getItem('isAtivo');
    console.log(ativoFromStorage);
    if (userToken == null) {
      history.push(`/login`);
    } else {
      // console.log(ativo);
      setIsButtonDisabled(ativoFromStorage);
    }
  }, [history]);

  return (
    <div className="backoffice-container">
      <PadraoHeader />
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
        {isButtonDisabled === false&& 
          <Link
            to="/listarUsuarios"
            className={`button ${!isButtonDisabled ? 'disabled' : ''}`}
            // onClick={(e) => e.preventDefault()}
          >
            Lista Usuário Admin
          </Link>
        }
        {isButtonDisabled === false && 
          <Link
            to="/listarProdutos"
            className={`button ${!isButtonDisabled ? 'disabled' : ''}`}
            // onClick={(e) => e.preventDefault()}
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
          <Link 
            to="/checarPedidos" 
            className="button"
          >
            Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Backoffice;
