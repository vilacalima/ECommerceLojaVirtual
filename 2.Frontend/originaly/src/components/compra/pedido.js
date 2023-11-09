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
import Frete from './frete';
import CarrinhoService from '../../service/carrinhoService';

const Pedido = () => {
  const [currentPage, setCurrentPage] = useState("pedido"); // Inicialmente, a página é "pedido"
  const [isModalOpen, setModalOpen] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState({
    numeroPedido: null,
    statusPedido: null,
  });
  const [textButton, setTextButton] = useState("Avançar");

  const salvarPedido = async () => {
    const clienteJSON = localStorage.getItem("usuario");
    const freteJSON = localStorage.getItem("frete");
    const pagamentoJSON = localStorage.getItem("opPagamento");

    const cliente = JSON.parse(clienteJSON);
    const frete = JSON.parse(freteJSON);
    const pagamento = JSON.parse(pagamentoJSON);

    let pag = 0;
    if(pagamento.opcaoPagamento === 'cartao'){
      pag = 1;
    }

    const dto = {
      emailCliente: cliente.email,
      opcaoPagamento: pag,
      opcaoFrete: frete.zona,
      valorFrete: frete.frete
    }

    const save = await CarrinhoService.save(dto);

    if (save.isSucess){
      window.onmessage("Pedido Salvo com sucesso");
      setTimeout(() => {
      }, 1000);
    }

    
    // Simule a obtenção dos dados do pedido do backend
    
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    if (currentPage === "pedido") {
      setCurrentPage("endereco");
    } else if (currentPage === "endereco") {
      setCurrentPage("pagamento");
      setTextButton('Finalizar Pedido');
    } else if (currentPage === 'pagamento'){
      setCurrentPage("finalizar");
    }
  };
  
  const renderComponent = () => {
    if (currentPage === "endereco") {
      return <Frete />;
    } else if (currentPage === "pagamento") {
      return <Pagamento />;
    } else if (currentPage === "finalizar") {
      salvarPedido();
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
      <button onClick={handleNext}>{textButton}</button>
    </div>
    
  );
};

export default Pedido;
