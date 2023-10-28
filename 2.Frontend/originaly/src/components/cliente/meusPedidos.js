// MeusPedidos.js

import React, { Component } from 'react';
import axios from 'axios';

class MeusPedidos extends Component {
  constructor() {
    super();
    this.state = {
      pedidos: [],
    };
  }

  componentDidMount() {
    // Simulando a busca de pedidos (substitua por uma solicitação GET real)
    const pedidosExemplo = [
      { numero: 1, data: '01/10/2023', valorTotal: 100.00, status: 'Entregue' },
      { numero: 2, data: '02/10/2023', valorTotal: 150.00, status: 'Em Processamento' },
      { numero: 3, data: '03/10/2023', valorTotal: 75.50, status: 'Entregue' },
    ];
    this.setState({ pedidos: pedidosExemplo });
  }

  render() {
    return (
      <div>
        <h1>Meus Pedidos</h1>
        


        <ul>
          {this.state.pedidos.map((pedido, index) => (
            <li key={index}>
              <div>{pedido.numero}</div>
              <div>{pedido.data}</div>
              <div>R$ {pedido.valorTotal.toFixed(2)}</div>
              <div>{pedido.status}</div>
              <button onClick={() => this.verDetalhes(pedido)}>Detalhes</button>
            </li>
          ))}
        </ul>
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
