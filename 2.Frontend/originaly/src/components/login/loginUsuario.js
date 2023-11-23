import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoginService from '../../service/loginService';
import Cookies from 'js-cookie';
import axios from 'axios';
import './loginUsuario.css';

function LoginUsuario() {
  // const user = new LoginRecord(event.target.username.value, event.target.password.value);
  const [user, setUser] = useState({
    email: '',
    senha: '',
  });
    
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("usuario");
    if (loggedInUser) {
      doLogin(loggedInUser);
      // const foundUser = JSON.parse(loggedInUser);
      // setUsuario(foundUser);

      // doLogin(loggedInUser);
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
      window.postMessage('Sem premissão');
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
          </div>
        </main>


      </div>
    );
  }
  
  export default LoginUsuario;