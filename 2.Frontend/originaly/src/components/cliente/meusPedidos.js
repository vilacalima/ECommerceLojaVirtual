// MeusPedidos.js

import React, { Component } from 'react';
import axios from 'axios';
import CarrinhoService from '../../service/carrinhoService';
import './meusPedidos.css';
import PadraoHeader from '../header/padraoHeader';
import ItensPedido from '../compra/itensPedido';

class MeusPedidos extends Component {
  constructor() {
    super();
    this.state = {
      pedidos: [],
      showModal: false,
      itensPedidoSelecionado: null,
    };
  }

  componentDidMount() {

    const userToken = localStorage.getItem('usuario');
    const usuarioParse = JSON.parse(userToken);
    const email = usuarioParse.email;

    const getAll = async () => {
      const item = await CarrinhoService.getPedidoCliente(email);

      this.setState({ pedidos: item });
    }

    getAll();
  }

  detalhesProduto(item) {
    this.setState({ showModal: true, itensPedidoSelecionado: item });
  }

  fecharModal = () => {
    // Função para fechar o modal
    this.setState({ showModal: false, itensPedidoSelecionado: null });
  };

  render() {
    return (
      <div className='meus-pedidos-container'>

        <PadraoHeader />
        
        <h1>Meus Pedidos</h1>
          
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Id</th>
              <th>Total Pago</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pedidos.map((item) => (
              <tr key={item.Id}>
                <td>{item.id}</td>
                <td>R$ {item.total.toFixed(2)}</td>
                <td>
                  <a>
                    <span
                      className="carrinho-link"
                      onClick={() => this.detalhesProduto(item)}>
                      Detalhes
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.showModal && (
          <div className="meus-pedidos-modal">
            <div className="meus-pedidos-modal-content">
              <span className="meus-pedidos-close" onClick={this.fecharModal}>
                &times;
              </span>
              <h2>Itens do Pedido</h2>
              <ItensPedido itens={this.state.itensPedidoSelecionado} />
            </div>
          </div>
        )}

      </div>
    );
  }

  verDetalhes(pedido) {
    // Implemente a funcionalidade para exibir detalhes do pedido aqui.
    // Você pode usar um modal ou redirecionar para outra página.
    // Acesse os detalhes do pedido usando a variável 'pedido'.
  }
}

export default MeusPedidos;
