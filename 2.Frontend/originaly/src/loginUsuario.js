import React from 'react';
import { Link } from 'react-router-dom';

function LoginUsuario() {
    const handleSubmit = (event) => {
      event.preventDefault();
  

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
                  <input type="text" id="username" name="username" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" required />
                </div>
              </div>

              <Link to="inicial"> Entrar</Link>
            </form>
          </div>
        </main>


      </div>
    );
  }
  
  export default LoginUsuario;