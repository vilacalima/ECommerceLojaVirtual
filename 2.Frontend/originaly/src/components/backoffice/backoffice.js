import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import './backoffice.css';
import axios from 'axios';
import PadraoHeader from '../header/padraoHeader';

function Backoffice() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');
    const ativoFromStorage = localStorage.getItem('isAtivo');
  
    if (userToken === null || ativoFromStorage === null) {
      history.push('/login');
    } else {
      console.log(ativoFromStorage);
      const isAtivo = ativoFromStorage === 'true';
      setIsButtonDisabled(isAtivo);
      console.log(isAtivo)
    }
  }, [history]);

  return (
    <div className="backoffice-container">
      <PadraoHeader />  
      <div className="backoffice-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <div className="home-links">
        {isButtonDisabled &&  (
          <Link
            className="button"
            to="/listarUsuarios"
            // className={`button ${isButtonDisabled ? 'disabled' : ''}`}
          >
            Lista Usuário Admin
          </Link>
        )}
        {console.log(isButtonDisabled)}
        {isButtonDisabled && (
          <Link
            className="button"
            to="/listarProdutos"
            // className={`button ${isButtonDisabled ? 'disabled' : ''}`}
          >
            Lista Produto
          </Link>
        )}
        {!isButtonDisabled && (
          <Link 
            to="/listarProdutosEstoquista" 
            className="button"
          >
            Lista Produto Estoquista
          </Link>
        )}
        {!isButtonDisabled && (
          <Link 
            to="/checarPedidos" 
            className="button"
          >
            Pedidos
          </Link>
        )}
        </div>
      </div>
    </div>
  );
}

export default Backoffice;
