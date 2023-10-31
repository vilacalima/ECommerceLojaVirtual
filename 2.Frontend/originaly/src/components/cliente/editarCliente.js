import React, { Component } from 'react';
import axios from 'axios';
import ClienteService  from '../../service/clienteService';
import { useParams } from 'react-router-dom';
import './editarCliente.css';
import { Link, BrowserRouter } from 'react-router-dom';

class EditarCliente extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
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
          cep: '',
          isFaturamento: false,
          isEnderecoPadrao: false,
          isEnderecoEntrega: true,
          isAtivo: true
        },
      ],
      dataNascimento: '',
      sexo: 'Masculino',
      senha: '',
      cadastradoComSucesso: false,
      erroNoCadastro: false,
      enderecoPadraoIndex: 0, // Índice do endereço padrão
      enderecosBanco: []
    };
  }

  async componentDidMount() {
    const { email } = this.props.match.params;
    const history = new BrowserRouter().history;

    const userToken = localStorage.getItem('usuario');

    if (userToken == null) {
      history.push(`/login`);
    } else {
      try {
        const cliente = await ClienteService.getClientByEmail(email);
        this.setState({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          email: cliente.email,
          telefone: cliente.telefone,
          dataNascimento: cliente.dataNasc,
          sexo: cliente.sexo,
          enderecosBanco: cliente.enderecos
        });
      } catch (error) {
        console.error('Erro ao buscar dados do Cliente:', error);
      }
    }  
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
      isEnderecoPadrao: false,
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
      endereco.isEnderecoPadrao = i === index;
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

  handleSubmit = async (event) => {
    event.preventDefault();

    const email = this.state.email;
    // Adicione o índice do endereço padrão ao objeto do cliente
    // const enderecos = {
    //   this.state.enderecos,
    // };

    const saveCliente = await ClienteService.newAddress(email, this.state.enderecos);
    console.log(saveCliente);

    // Simular um atraso de 2 segundos para exibir a mensagem de sucesso
    setTimeout(() => {
      this.setState({ cadastradoComSucesso: true });
      // Após 2 segundos, redirecionar para a página inicial (você pode substituir a URL pela sua página inicial real)
      setTimeout(() => {
        this.setState({ cadastradoComSucesso: false });
        window.location.href = '/';
      }, 2000);
    }, 2000);
    
  };

  handleSubmitDadosPessoais = async (event) => {
    event.preventDefault();

    // Adicione o índice do endereço padrão ao objeto do cliente
    const cliente = {
      email: this.state.email,
      nome: this.state.nome,
      dataNasc: this.state.dataNascimento,
      senha: this.state.senha,
    };

    const saveCliente = await ClienteService.updateDadosPessoais(cliente);
    console.log(saveCliente);

    // Simular um atraso de 2 segundos para exibir a mensagem de sucesso
    setTimeout(() => {
      this.setState({ cadastradoComSucesso: true });
      // Após 2 segundos, redirecionar para a página inicial (você pode substituir a URL pela sua página inicial real)
      setTimeout(() => {
        this.setState({ cadastradoComSucesso: false });
        window.location.href = '/';
      }, 2000);
    }, 2000);
    
  };

  render() {
    return (
      <div className="form-container">
        <h1>Editar Cliente</h1>
        <Link to="/MeusPedidos">
            <button>Meus Pedidos</button>
          </Link>
        <div className="card-container"> {/* Aplicando a classe card-container */}

        
            {/* Campos de dados pessoais */}
          <form onSubmit={this.handleSubmitDadosPessoais}>
            <div className='card'>
              <h2>Dados Pessoais:</h2>
              <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} required />
              </div>
              <div>
                <h4>CPF: {this.state.cpf}</h4>
              </div>
              <div>
                <h4>E-mail: {this.state.email}</h4>
              </div>
              <div>
                <h4>Telefone: {this.state.telefone}</h4>
              </div>
              <div>
                <label>Data de nascimento:</label>
                <input type="date" name="dataNascimento" value={this.state.dataNascimento} onChange={this.handleChange} required />
              </div>
              <div>
                <label>Senha:</label>
                <input type="password" name="senha" value={this.state.senha} onChange={this.handleChange} required />
              </div>

              <button type="submit">Salvar</button>
            </div>
          </form>
          

          <div className='card'>
            <h2>Meus Endereços:</h2>
            { this.state.enderecosBanco.map((endereco, index) => (
              <div key={index}>
                <h4>Endereço {index + 1}:</h4>
                <div>
                  <h4>CEP: {endereco.cep}</h4>
                </div>
                <div>
                  <h4>Rua: {endereco.rua}</h4>
                </div>
                <div>
                  <h4>Número: {endereco.numero}</h4>
                </div>
                <div>
                  <h4>Complemento: {endereco.complemento}</h4>
                </div>
                <div>
                  <h4>Bairro: {endereco.bairro}</h4>
                </div>
                <div>
                  <h4>Cidade: {endereco.cidade}</h4>
                </div>
                {/* Adicione qualquer outra informação que você deseja exibir para cada endereço */}
              </div>
            ))}
          </div>
          {/* Campos de endereço */}
          <form onSubmit={this.handleSubmit}>
          <div className='card'>
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
                    name="isEnderecoPadrao"
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
          </div>
          
        </form>

        </div>
      </div>
    );
  }
}

export default EditarCliente;
