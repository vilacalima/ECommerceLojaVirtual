import React from 'react';
import InputMask from 'react-input-mask';
import './alterarUsuario.css';

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("A confirmação de senha não corresponde à senha digitada.");
      return;
    }
  };

  return (
    <div className="app">
      <main className="app-main">
        <div className="form-container">
          <h2>Alterar usuário</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" />
              </div>

              <div className="form-column">
                <label htmlFor="email">Email:</label>
                <InputMask
                  type="email"
                  id="email"
                  name="email"
                  disabled={true} ///AQUI O CAMPO ESTA DESABILITADO, PARA QUE NAO POSSA ALTERAR NADA 
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>Tipo de Usuário:</label>
                  <div>
                    <input type="radio" id="tipoCliente" name="tipoUsuario" value="cliente"  />
                    <label htmlFor="tipoCliente">Cliente</label>
                  </div>
                  <div>
                    <input type="radio" id="tipoFuncionario" name="tipoUsuario" value="funcionario" />
                    <label htmlFor="tipoFuncionario">Funcionário</label>
                  </div>
                  <div>
                    <input type="radio" id="tipoAdmin" name="tipoUsuario" value="admin" />
                    <label htmlFor="tipoAdmin">Administrador</label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="confirmPassword">Confirmar Senha:</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
              </div>



              <button type="submit">Confirmar</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="app-footer">
        <p>RODAPE - FAZERrr</p>
      </footer>
    </div>
  );
} export default App;