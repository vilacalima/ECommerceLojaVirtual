import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './pedido.css';


const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState({
    numeroPedido: null,
    statusPedido: null,
  });

  const salvarPedido = () => {
    // Simule a obtenção dos dados do pedido do backend
    setTimeout(() => {
      const novoPedidoInfo = {
        numeroPedido: '123456',
        statusPedido: 'Salvo',
      };
      setPedidoInfo(novoPedidoInfo);
      setModalOpen(true);
    }, 1000);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={salvarPedido}>Salvar Pedido</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Detalhes do Pedido</h2>
            {pedidoInfo.numeroPedido && (
              <p className="modal-content-text">Número do Pedido: {pedidoInfo.numeroPedido}</p>
            )}
            {pedidoInfo.statusPedido && (
              <p className="modal-content-text">Status do Pedido: {pedidoInfo.statusPedido}</p>
            )}
            <button className="modal-button" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
