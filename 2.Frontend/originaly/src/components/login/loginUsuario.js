import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
//import './LoginUsuario.css';
import LoginService from '../../service/loginService'

function LoginUsuario() {
      // const user = new LoginRecord(event.target.username.value, event.target.password.value);
      const [user, setUser] = useState({
        email: '',
        senha: '',
      });
    
    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const login = await LoginService.getLogin(user);

        if (login === 'administrador') {
            history.push(`/home/${false}`);
        } else if (login === 'estoquista') {
            history.push(`/home/${true}`);
        } else if (login === 'Cliente') {
          history.push(`/perfil/${user.email}`);
        } else {
          window.postMessage('Sem premissão');
        } 
      } catch (error) {
        console.error('Erro ao enviar login:', error);
      }
  
    };
  
    return (

      <div className="app">

        <main className="app-main">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="username">Usuário:</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
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
              <button type="submit">Entrar</button>
            </form>
          </div>
        </main>


      </div>
    );
  }
  
  export default LoginUsuario;