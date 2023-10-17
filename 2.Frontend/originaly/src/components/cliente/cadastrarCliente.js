import React, { Component } from 'react';
import axios from 'axios';

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
          cep: '',
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
          padrao: true,
        },
      ],
      dataNascimento: '',
      sexo: 'Masculino',
      senha: '',
      cadastradoComSucesso: false,
      erroNoCadastro: false,
      enderecoPadraoIndex: 0, // Índice do endereço padrão
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEnderecoChange = (index, name, value) => {
    const enderecos = [...this.state.enderecos];
    enderecos[index][name] = value;
    this.setState({ enderecos });
  };

  adicionarEndereco = () => {
    const novoEndereco = {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
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
    this.setState({ enderecos, enderecoPadraoIndex: index });
  };

  validarCEP = async (cep, index) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        alert('CEP inválido');
      } else {
        const enderecos = [...this.state.enderecos];
        enderecos[index] = {
          ...enderecos[index],
          cep: data.cep,
          rua: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        };
        this.setState({ enderecos });
      }
    } catch (error) {
      console.error('Erro ao validar CEP:', error);
    }
  };

  verificarEmailExistente = async (email) => {
    try {
      const response = await axios.get('/verificar-email', {
        params: {
          email,
        },
      });

      return response.data.emailJaExiste;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return true; // Assumindo que ocorreu um erro na verificação (você pode tratar erros adequadamente)
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se o email já existe na base
    const emailJaExiste = await this.verificarEmailExistente(this.state.email);

    if (emailJaExiste) {
      this.setState({ erroNoCadastro: true });
    } else {
      // Adicione o índice do endereço padrão ao objeto do cliente
      const cliente = {
        nome: this.state.nome,
        cpf: this.state.cpf,
        email: this.state.email,
        telefone: this.state.telefone,
        enderecos: this.state.enderecos,
        enderecoPadraoIndex: this.state.enderecoPadraoIndex,
        dataNascimento: this.state.dataNascimento,
        sexo: this.state.sexo,
        senha: this.state.senha,
      };

      // Simular um atraso de 2 segundos para exibir a mensagem de sucesso
      setTimeout(() => {
        this.setState({ cadastradoComSucesso: true });
        // Após 2 segundos, redirecionar para a página inicial (você pode substituir a URL pela sua página inicial real)
        setTimeout(() => {
          this.setState({ cadastradoComSucesso: false });
          window.location.href = '/';
        }, 2000);
      }, 2000);
    }
  };

  render() {
    return (
      <div className="form-container">
        <h1>Cadastrar Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          {/* Campos de dados pessoais */}
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
          <div>
            <label>Data de nascimento:</label>
            <input type="date" name="dataNascimento" value={this.state.dataNascimento} onChange={this.handleChange} required />
          </div>
          <div>
            <label>Sexo:</label>
            <input type="radio" name="sexo" value="Masculino" onChange={this.handleChange} required /> Masculino
            <input type="radio" name="sexo" value="Feminino" onChange={this.handleChange} required /> Feminino
            <input type="radio" name="sexo" value="Outro" onChange={this.handleChange} required /> Outro
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" name="senha" value={this.state.senha} onChange={this.handleChange} required />
          </div>

          {/* Campos de endereço */}
          {this.state.enderecos.map((endereco, index) => (
            <div key={index}>
              <h2>Endereço {index + 1}</h2>
              <div>
                <label>CEP:</label>
                <input
                  type="text"
                  name={`cep[${index}]`}
                  value={endereco.cep}
                  onChange={(e) => this.handleEnderecoChange(index, 'cep', e.target.value)}
                  onBlur={(e) => this.validarCEP(e.target.value, index)} // Adicione o onBlur para validar o CEP quando sair do campo
                  required
                />
              </div>
              <div>
                <label>Logradouro:</label>
                <input
                  type="text"
                  name={`rua[${index}]`}
                  value={endereco.rua}
                  onChange={(e) => this.handleEnderecoChange(index, 'rua', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Número:</label>
                <input
                  type="text"
                  name={`numero[${index}]`}
                  value={endereco.numero}
                  onChange={(e) => this.handleEnderecoChange(index, 'numero', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Complemento:</label>
                <input
                  type="text"
                  name={`complemento[${index}]`}
                  value={endereco.complemento}
                  onChange={(e) => this.handleEnderecoChange(index, 'complemento', e.target.value)}
                />
              </div>
              <div>
                <label>Bairro:</label>
                <input
                  type="text"
                  name={`bairro[${index}]`}
                  value={endereco.bairro}
                  onChange={(e) => this.handleEnderecoChange(index, 'bairro', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Cidade:</label>
                <input
                  type="text"
                  name={`cidade[${index}]`}
                  value={endereco.cidade}
                  onChange={(e) => this.handleEnderecoChange(index, 'cidade', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>UF:</label>
                <input
                  type="text"
                  name={`uf[${index}]`}
                  value={endereco.uf}
                  onChange={(e) => this.handleEnderecoChange(index, 'uf', e.target.value)}
                  required
                />
              </div>

              <button type="button" onClick={() => this.definirComoPadrao(index)}>
                Definir como Padrão
              </button>
              {index > 0 && (
                <div>
                  <label>Endereço Padrão:</label>
                  <input
                    type="radio"
                    name="enderecoPadrao"
                    value={index}
                    onChange={this.handleChange}
                    checked={this.state.enderecoPadraoIndex === index}
                  />
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={this.adicionarEndereco}>
            Adicionar Endereço
          </button>

          <button type="submit">Cadastrar</button>
          {this.state.cadastradoComSucesso && (
            <div className="mensagem sucesso">Cadastrado com sucesso!</div>
          )}
          {this.state.erroNoCadastro && (
            <div className="mensagem erro">Erro no cadastro. Tente novamente.</div>
          )}
        </form>
      </div>
    );
  }
}

export default CadastroCliente;
