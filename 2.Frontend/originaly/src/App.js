import React from 'react';
import InputMask from 'react-input-mask';
import './App.css';

function App() {
  return (
    <div className="app">


      {/* <header className="app-header">
        <h1>Minha Tela Web</h1>
      </header> */}
      <main className="app-main">
        <div className="form-container">
          <h2>Cadastro de usuário</h2>

          <form>
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
              <div className="form-column">
                <label htmlFor="Tele">Telefone:</label>
                <input type="email" id="email" name="email" />

              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="uf">UF:</label>
                  <select id="uf" name="uf">
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AM">Amazonas</option>
                    <option value="AP">Amapá</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal	</option>
                    <option value="ES">Espírito Santo	</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="MS">Mato Grosso do Sul	</option>
                    <option value="MT">Mato Grosso	</option>
                    <option value="PA">Pará</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="RJ">Rio de Janeiro	</option>
                    <option value="RN">Rio Grande do Norte	</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="RS">Rio Grande do Sul	</option>
                    <option value="SC">Santa Catarina	</option>
                    <option value="SE">Sergipe</option>
                    <option value="SP">São Paulo	</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                <div className="form-column">
                  <label htmlFor="city">Cidade:</label>
                  <input type="text" id="city" name="city" />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" />
              </div>


              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="endereco">Endereço:</label>
                  <input type="text" id="endereco" name="endereco" />
                </div>
                <div className="form-column">
                  <label htmlFor="numero">Número e complemento:</label>
                  <input type="text" id="numero" name="numero" />
                </div>
              </div>

              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="app-footer">
        <p>RODAPE - FAZER</p>
      </footer>
    </div>
  );
} export default App;