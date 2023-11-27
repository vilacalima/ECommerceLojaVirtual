import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProdutoService from '../../service/produtoService';
import { Link, useHistory } from 'react-router-dom'; 
import PadraoHeader from '../header/padraoHeader';
import CarrinhoService from '../../service/carrinhoService';
import CalculadoraService from '../../service/calculadora/calculadoraService';
import Pedido from '../compra/pedido';
import TableCarrinho from './tableCarrinho';
import Frete from '../compra/frete';
import Pagamento from "../compra/pagamento";

function ListarCarrinho() {
  const [quantidade, setQuantidade] = useState([]);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState("pedido");
  const [textButton, setTextButton] = useState("Finalizar Pedido");

  const calcularSomaTotal = (dto) => {
    let somaTotal = 0;
  
    for (let i = 0; i < dto.length; i++) {
      somaTotal += dto[i].precoTotal;
    }
    
    setQuantidade(somaTotal);
  };
  
  const handleFinalizar = () => {
    history.push('/pedido');
  };

  const handleNext = () => {
    if (currentPage === "pedido") {
      setCurrentPage("endereco");
      setTextButton('Avançar');
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
      let userToken = localStorage.getItem('usuario');
      
      if(userToken === null){
        history.push('/login');
      } else {
        history.push('/checkout');
      }
    } 
  };

  return (
    <div className='pedido-container'>
      <PadraoHeader pedidos={false}/>
      <h2>Itens do Carrinho</h2>

      <TableCarrinho />

      {/* <button onClick={handleFinalizar}>Finalizar Pedido</button> */}

      {renderComponent()} {/* Renderize o componente apropriado com base na página atual */}
      <button onClick={handleNext}>{textButton}</button>
    </div>
  );
}

export default ListarCarrinho;
