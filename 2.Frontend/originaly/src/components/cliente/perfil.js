import React, { Component } from 'react';
import axios from 'axios';
import ClienteService  from '../../service/clienteService';
import { useParams } from 'react-router-dom';
import './editarCliente.css';
import { Link, BrowserRouter } from 'react-router-dom';
import PadraoHeader from '../header/padraoHeader';
import './perfil.css';
import Endereco from './endereco';

class Perfil extends Component {
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
      enderecosBanco: [],
      adicionarNovoEndereco: false
    };
  }

  async componentDidMount() {
    // const { email } = this.props.match.params;
    const history = new BrowserRouter().history;

    const userToken = localStorage.getItem('usuario');
    console.log(userToken)
    const { email } = JSON.parse(userToken);

    console.log(email);

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

  handlerAdicionarNovoEndereco = () => {
    this.setState({ adicionarNovoEndereco: true });
  }

  render() {
    return (
      <div className="perfil-form-container">
        <PadraoHeader pedidos={true}/>
        <h1>Área do Cliente</h1>

        <div className="card-container"> {/* Aplicando a classe card-container */}
            {/* Campos de dados pessoais */}
          <form onSubmit={this.handleSubmitDadosPessoais}>
            <div className='card'>
              <h2>Dados Pessoais:</h2>
              <div>
                <label>Nome:</label>
                <input className='perfil-input-text' type='text' name="nome" value={this.state.nome} onChange={this.handleChange} required />
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
                <input className='perfil-input-text' type="date" name="dataNascimento" value={this.state.dataNascimento} onChange={this.handleChange} required />
              </div>
              <div>
                <label>Senha:</label>
                <input className='perfil-input-text' type="password" name="senha" value={this.state.senha} onChange={this.handleChange} required />
              </div>

              <button type="submit">Salvar</button>
            </div>
          </form>
          
          <div className='perfil-card-2'>
          <h2>Meus Endereços:</h2>
          <table className="tabela-produtos">
                <thead>
                <tr>
                    <th>CEP</th>
                    <th>Rua</th>
                    <th>Número</th>
                    <th>Complemento</th>
                    <th>Bairro</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {this.state.enderecosBanco.map((item) => (
                    <tr key={item.id}>
                    <td>{item.cep}</td>
                    <td>{item.rua}</td>
                    <td>{item.numero}</td>
                    <td>{item.complemento}</td>
                    <td>{item.bairro}</td>
                    <td>{item.cidade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={this.handlerAdicionarNovoEndereco}>Adicionar novo Endereço</button>
            {this.state.adicionarNovoEndereco === true ? (
              <Endereco />
            ) : (
              null // ou outro conteúdo, se necessário
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
