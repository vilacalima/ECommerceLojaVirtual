import React, { Component } from 'react';
import axios from 'axios';
import ClienteService  from '../../service/clienteService';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

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
          isEnderecoPadrao: true,
          isFaturamento: false
        },
      ],
      dataNascimento: '',
      sexo: 'Masculino',
      senha: '',
      confirmarSenha: '',
      cadastradoComSucesso: false,
      senhaErrada: false,
      erroNoCadastro: false,
      enderecoPadraoIndex: 0, 
      enderecoFaturamentoIndex: 0,// Índice do endereço padrão
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
    this.setState({
      enderecos,
      enderecoPadraoIndex: index,
    });
    // Set isEnderecoPadrao to true in the selected address
    enderecos[index].isEnderecoPadrao = true;
  };
  definirComoFaturamento = (index) => {
    const enderecos = [...this.state.enderecos];
    enderecos.forEach((endereco, i) => {
      endereco.isFaturamento = i === index;
    });
    this.setState({ 
      enderecos, 
      enderecoFaturamentoIndex: index 
    });

    enderecos[index].isFaturamento = true;
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

  async componentDidMount() {
    const history = new BrowserRouter().history;

    const userToken = localStorage.getItem('usuario');

    if (userToken == null) {
      history.push(`/login`);
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se o email já existe na base
    const emailJaExiste = await ClienteService.verificarEmailExistente(this.state.email);
    
    if (this.state.confirmarSenha != this.state.senha){
      this.setState({ senhaErrada: true });
      return;
    }
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
        dataNasc: this.state.dataNascimento,
        sexo: this.state.sexo,
        senha: this.state.senha,
      };

      const saveCliente = await ClienteService.newCLiente(cliente);
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
          <div>
            <label>Confirmar senha:</label>
            <input type="password" name="confirmarSenha" value={this.state.confirmarSenha} onChange={this.handleChange} required />
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
                    name="isEnderecoPadrao"
                    value={index}
                    onChange={this.handleChange}
                    checked={this.state.enderecoPadraoIndex === index}
                  />
                </div>
              )}
              <button type="button" onClick={() => this.definirComoFaturamento(index)}>
                Endereco Faturamento
              </button>
              {index > 0 && (
                <div>
                  <label>Endereço de Faturamento:</label>
                  <input
                    type="radio"
                    name="isFaturamento"
                    value={index}
                    onChange={this.handleChange}
                    checked={this.state.enderecoFaturamentoIndex === index}
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
          {this.state.senhaErrada && (
            <div className="mensagem erro">Confirmação de senha invalida.</div>
          )}
        </form>
      </div>
    );
  }
}

export default CadastroCliente;
