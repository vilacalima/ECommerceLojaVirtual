import React, { Component } from 'react';

class CadastroCliente extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      enderecos: [
        {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          padrao: true,
        },
      ],
      dataNascimento: '',
      sexo: 'Masculino', // Pode definir um valor padrão
      senha: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  adicionarEndereco = () => {
    const novoEndereco = {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      padrao: false,
    };

    this.setState((prevState) => ({
      enderecos: [...prevState.enderecos, novoEndereco],
    }));
  };

  removerEndereco = (index) => {
    const enderecos = [...this.state.enderecos];
    enderecos.splice(index, 1);
    this.setState({ enderecos });
  };

  definirComoPadrao = (index) => {
    const enderecos = [...this.state.enderecos];
    enderecos.forEach((endereco, i) => {
      endereco.padrao = i === index;
    });
    this.setState({ enderecos });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
    // Por exemplo, usando uma solicitação HTTP para uma API de backend
    console.log(this.state); // Isso irá mostrar os dados no console, para fins de demonstração
  };

  render() {
    return (
      <div>
        <h1>Cadastro de Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nome:</label>
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
          {this.state.enderecos.map((endereco, index) => (
            <div key={index}>
              <h2>Endereço {index + 1}</h2>
              {/* Campos de endereço aqui */}
              <button type="button" onClick={() => this.removerEndereco(index)}>
                Remover
              </button>
              <button type="button" onClick={() => this.definirComoPadrao(index)}>
                Definir como Padrão
              </button>
            </div>
          ))}
          <button type="button" onClick={this.adicionarEndereco}>
            Adicionar Endereçoo
          </button>
          {/* Outros campos de cadastro, como data de nascimento, sexo e senha */}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default CadastroCliente;
