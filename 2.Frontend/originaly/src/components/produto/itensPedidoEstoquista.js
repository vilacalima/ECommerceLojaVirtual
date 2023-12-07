import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../compra/pagamento.css';

function ItensPedidoEstoquista(props) {
  const { itens } = props;
  
  return (
    <div className='borda'>
      <div>
        <p className='meus-pedidos-tag-p'>Tipo Frete: {itens.frete}</p>
        <p className='meus-pedidos-tag-p'>Opção de Pagamento: {itens.opPagamento}</p>
        <p className='meus-pedidos-tag-p'>Situação: {itens.situacaoVenda}</p>        
      </div>

      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Id</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Total Item</th>
          </tr>
        </thead>
        <tbody>
          {itens.carrinho.map((item, index) => (
              <tr key={`${index}`}>
                <td>{item.idProduto}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.precoUnitario.toFixed(2)}</td>
                <td>R$ {item.precoTotal.toFixed(2)}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default ItensPedidoEstoquista;
