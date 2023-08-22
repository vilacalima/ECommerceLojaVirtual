import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">


      {/* <header className="app-header">
        <h1>Minha Tela Web</h1>
      </header> */}
      <main className="app-main">
        <div className="form-container">
          <h2>Formulário</h2>
          <form>
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-column">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Telefone:</label>
              <input type="text" id="phone" name="phone" />
            </div>
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="uf">UF:</label>
                <input type="text" id="uf" name="uf" />
              </div>
              <div className="form-column">
                <label htmlFor="city">Cidade:</label>
                <input type="text" id="city" name="city" />
              </div>
              <div className="form-column">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="address">Endereço:</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className="form-row">
              <label htmlFor="number">Número:</label>
              <input type="text" id="number" name="number" />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2023 Minha Empresa</p>
      </footer>
    </div>
  );
}

export default App;