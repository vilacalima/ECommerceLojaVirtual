import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './pedido.css';
import Pagamento from './pagamento';
import ItensPedido from './itensPedido';
import PadraoHeader from '../header/padraoHeader';

const Pedido = () => {
  const [currentPage, setCurrentPage] = useState("pedido"); // Inicialmente, a página é "pedido"
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

  const handleNext = () => {
    if (currentPage === "pedido") {
      setCurrentPage("endereco");
    } else if (currentPage === "endereco") {
      setCurrentPage("pagamento");
    } else if (currentPage === "pagamento") {
      setCurrentPage("pagamento");
    }
  };
  
  const renderComponent = () => {
    if (currentPage === "endereco") {
      // return <Pedido />;
    } else if (currentPage === "pagamento") {
      return <Pagamento />;
    }
  };
  

  return (
    
    <div className='pedido-container'>
      <PadraoHeader pedidos={false}/>
      <ItensPedido />
      {isModalOpen && (
        <div className="modal">
          {/* ... Conteúdo do modal ... */}
        </div>
      )}
      {renderComponent()} {/* Renderize o componente apropriado com base na página atual */}
      <button onClick={handleNext}>Avançar</button>
    </div>
    
  );
};

export default Pedido;
