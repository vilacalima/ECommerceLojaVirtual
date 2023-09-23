import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import UsuarioService from './service/usuarioService';
import axios from 'axios';
import './cadastroUsuario.css';

function App() {
  const [cpfValue, setCpfValue] = useState('');
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCpfChange = (event) => {
    const newCpfValue = event.target.value;
    setCpfValue(newCpfValue);
    setIsCpfValid(cpfValidator.isValid(newCpfValue));
  };
  
  const sendUserData = async (userData) => {
    try {
      const response = UsuarioService.newUser(userData);
      console.log('Dados enviados com sucesso:', response);

            // Após o cadastro bem-sucedido, defina showSuccessMessage para true
            setShowSuccessMessage(true);

            // Use setTimeout para ocultar a mensagem após 3 segundos
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000); // 3000 milissegundos = 3 segundos


    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("A confirmação de senha não corresponde à senha digitada.");
      return;
    }

    const userData = {
      nome: event.target.name.value,
      email: event.target.email.value,
      cpf: cpfValue,
      ativo: true,
      grupo: event.target.tipoUsuario.value,
      senha: password,
    };
  
    // Chame a função para enviar os dados para o backend
    sendUserData(userData);
  };

  return (
    <div className="app">
      <main className="app-main">
        <div className="form-container">
          <h2>Cadastrar usuário</h2>
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
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="cpf">CPF:</label>
                <InputMask
                  type="text"
                  id="cpf"
                  name="cpf"
                  mask="999.999.999-99"
                  value={cpfValue}
                  onChange={handleCpfChange}
                  style={{ borderColor: isCpfValid ? 'initial' : 'red' }}
                />
                {!isCpfValid && <p className="error-message">CPF inválido</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Tipo de Usuário:</label>
                <div>
                  <input type="radio" id="tipoCliente" name="tipoUsuario" value="cliente" />
                  <label htmlFor="tipoCliente">Cliente</label>
                </div>
                <div>
                  <input type="radio" id="tipoFuncionario" name="tipoUsuario" value="funcionario" />
                  <label htmlFor="tipoFuncionario">Funcionário</label>
                </div>
                <div>
                  <input type="radio" id="tipoAdmin" name="tipoUsuario" value="administrador" />
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
          </form>
        </div>
      </main>
      {/* Mensagem de sucesso (será exibida quando showSuccessMessage for verdadeira) */}
    {showSuccessMessage && (
      <div className="success-message">
        Usuário cadastrado com sucesso!
      </div>  
    )}
    </div>
  );
}

export default App;