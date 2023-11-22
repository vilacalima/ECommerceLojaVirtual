// MeusPedidos.js

import React, { Component } from 'react';
import axios from 'axios';
import CarrinhoService from '../../service/carrinhoService';
import '../cliente/meusPedidos.css';
import PadraoHeader from '../header/padraoHeader';
import ItensPedidoEstoquista from './itensPedidoEstoquista';

class PedidosEstoquista extends Component {
  constructor() {
    super();
    this.state = {
      pedidos: [],
      showModal: false,
      itensPedidoSelecionado: null,
      selecao: {},
    };
  }

  componentDidMount() {
    
      const getAll = async () => {
        const pedidos = await CarrinhoService.getAllPedidoOrderByDate();
    
        const selecao = {};
        pedidos.forEach((pedido) => {
          selecao[pedido.id] = pedido.situacaoVenda;
        });
    
        this.setState({ pedidos, selecao });
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

  handleSelecaoChange = (id, valorSelecionado) => {
    this.setState((prevState) => ({
      selecao: { ...prevState.selecao, [id]: valorSelecionado },
    }));
  };

  render() {
    return (
      <div className='meus-pedidos-container'>

      <PadraoHeader />
      
      <h1>Meus Pedidos</h1>
        
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Data Compra</th>
            <th>Id</th>
            <th>Total Pago</th>
            <th></th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {this.state.pedidos.map((item) => (
            <tr key={item.Id}>
              <td>{new Date(item.dataCompra).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              <td>{item.id}</td>
              <td>R$ {item.total}</td>
              <td>
                <a>
                  <span
                    className="carrinho-link"
                    onClick={() => this.detalhesProduto(item)}>
                    Detalhes
                  </span>
                </a>
              </td>
              <td>
              <select
                value={this.state.selecao[item.id] || ''}
                onChange={(e) => this.handleSelecaoChange(item.id, e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Cadastrado">Cadastrado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Finalizado">Finalizado</option>
              </select>
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
            <ItensPedidoEstoquista itens={this.state.itensPedidoSelecionado} />
          </div>
        </div>
      )}

      </div>
    );
  }
}

export default PedidosEstoquista;
