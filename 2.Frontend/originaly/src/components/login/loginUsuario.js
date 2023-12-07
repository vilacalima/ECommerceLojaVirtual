import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoginService from '../../service/loginService';

import './loginUsuario.css';
import BoxResponse from '../util/boxResponse';

function LoginUsuario() {
  const [user, setUser] = useState({
    email: '',
    senha: '',
  });

  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);
    
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("usuario");
    if (loggedInUser) {
      doLogin(loggedInUser);
    }
  }, []);

  const doLogin = (login) => {
    if (login === 'administrador') {
      history.push('/backoffice');
      localStorage.setItem('isAtivo', true);
    } else if (login === 'estoquista') {
      history.push(`/backoffice`);
      localStorage.setItem('isAtivo', false);
    } else if (login === 'Cliente') {
      history.push(`/perfil`);
    } else {
      setMensagem("Usuário sem permissão ou não existe");
      setShowModal(true);
      // window.postMessage('Sem premissão');
    } 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const login = await LoginService.getLogin(user);
      
      const data = localStorage.getItem("usuario");
      
      if(data == null){

        if(login !== "Usuário não encontrado"){
          localStorage.setItem('usuario', JSON.stringify({ tipo: login, email: user.email }));
        }

        doLogin(login);
      } else {
        console.log(data);
      }

    } catch (error) {
      console.error('Erro ao enviar login:', error);
    }

  };

  const fecharModal = () => {
    setShowModal(false);
  };
  
    return (

      <div className="app">

        <main className="login-app-main">
          <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="login-form-column">
                  <label htmlFor="username">Usuário:</label>
                  <input 
                    // type="text" 
                    id="username" 
                    name="username" 
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="login-form-column">
                  <label htmlFor="password">Senha:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={user.senha}
                    onChange={(e) => setUser({ ...user, senha: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <button className='login-button' type="submit">Entrar</button>
            </form>
            <p>Ainda não está cadastrado ?</p>
            <a href="/cadastrarCliente">Cadastre-se</a>
          </div>
        </main>

        {showModal && (
          <div className="meus-pedidos-modal">
            <div className="meus-pedidos-modal-content">
              <span className="meus-pedidos-close" onClick={fecharModal}>
                &times;
              </span>
              <BoxResponse itens={mensagem} />
            </div>
          </div>
        )}

      </div>
    );
  }
  
  export default LoginUsuario;