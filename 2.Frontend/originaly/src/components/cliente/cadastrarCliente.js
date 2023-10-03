import React, { Component } from 'react';
import './cadastrarCliente.css';

class CadastroCliente extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      endereco: '',
      dataNascimento: '',
      sexo: 'Masculino', // Pode definir um valor padrão
      senha: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
    // Por exemplo, usando uma solicitação HTTP para uma API de backend
    console.log(this.state); // Isso irá mostrar os dados no console, para fins de demonstração
  }

  render() {
    return (
      <div className='cadastrar-form-container'>
        <h1>Cadastro de Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nome:</label >
            <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required />
          </div>
          <div>
            <label>CPF:</label>
            <input type="text" name="cpf" value={this.state.cpf} onChange={this.handleChange} required />
          </div>
          <div>
            <label>E-mail:</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" name="telefone" value={this.state.telefone} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Endereço:</label>
            <input type="text" name="endereco" value={this.state.endereco} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={this.state.dataNascimento} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Sexo:</label>
            <select name="sexo" value={this.state.sexo} onChange={this.handleChange}>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" name="senha" value={this.state.senha} onChange={this.handleChange} required />
          </div>
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CadastroCliente;
