import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProdutoService from '../../service/produtoService';
import { Link, useHistory } from 'react-router-dom'; 
import PadraoHeader from '../header/padraoHeader';
import './carrinho.css';
import CarrinhoService from '../../service/carrinhoService';
import CalculadoraService from '../../service/calculadora/calculadoraService';
import Pedido from '../compra/pedido';

function ListarCarrinho() {
  const [buscaParcial, setBuscaParcial] = useState('');
  const [pagina, setPagina] = useState(1);
  const [produtosPorPagina, setProdutosPorPagina] = useState(10);
  const [item, setItem] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState([]);
  const history = useHistory();


  const loadCarrinho = async (email) => {
    const dto = await CarrinhoService.getCarrinhoTemporario(email)
    const carrinhoArray = Array.isArray(dto) ? dto : [];
    setCarrinho(dto);
    calcularSomaTotal(carrinhoArray);
  };

  useEffect(() => {
    
    try {
        const loggedInUser = localStorage.getItem("usuario");
        let carrinho = '';
        if (loggedInUser != null){
            const usuarioParse = JSON.parse(loggedInUser);
            carrinho = usuarioParse.email;
        } else {
            carrinho = 'Usuario_nao_logado';
        }
        
        loadCarrinho(carrinho);
    } catch (error) {
    console.log(error);
    }
  }, [pagina, buscaParcial]);

  const calcularSomaTotal = (dto) => {
    let somaTotal = 0;
  
    for (let i = 0; i < dto.length; i++) {
      somaTotal += dto[i].precoTotal;
    }
    
    setQuantidade(somaTotal);
  };
  
  const handleQuantidadeProduto = async (item) => {
    const updatedCarrinho = carrinho.map((c) =>
      c.idProduto === item.idProduto ? { ...c, quantidade: c.quantidade + 1, precoTotal:  CalculadoraService.calculatePrecoTotal(c.quantidade, c.precoUnitario)} : c
    );
    setCarrinho(updatedCarrinho);

    const dto = await CarrinhoService.updateCarrinhoTemporario(carrinho);

    if(dto.isSuccess === true){
        setTimeout(() => {
            window.location.href = '/carrinho';
        }, 10000);   
    } 
  };
  
  const handleDiminuirQuantidadeProduto = async (item) => {
    if (item.quantidade > 0) {
      const updatedCarrinho = carrinho.map((c) =>
        c.idProduto === item.idProduto ? { ...c, quantidade: c.quantidade - 1, precoTotal:  CalculadoraService.calculatePrecoTotal(c.quantidade, c.precoUnitario)} : c
      );
      
      setCarrinho(updatedCarrinho);
     await CarrinhoService.updateCarrinhoTemporario(carrinho);
    }
  };
  
  const handleExcluirItem = async (item) => {
    try {
        const dto = await CarrinhoService.deleteItemCarrinhoTemporario(item.id);
        
        if(dto.isSuccess === true){
            setTimeout(() => {
                window.location.href = '/carrinho';
            }, 2000);   
        } else{
            window.postMessage("Erro, item não deletado");
        }

    } catch (error){
        console.log(error);
    }
  };

  const handleFinalizar = () => {
    history.push('/pedido');
  };

  return (
    <div className='pedido-container'>
      <PadraoHeader pedidos={false}/>
      <h2>Itens do Carrinho</h2>

      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Preço Total</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item) => (
            <tr key={item.emailCliente}>
              <td>{item.nomeProduto}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.precoUnitario}</td>
              <td>R$ {item.precoTotal}</td>
              <td>
                <a>
                  <span
                    className="carrinho-link"
                    onClick={() => handleDiminuirQuantidadeProduto(item)}>
                    -
                  </span>
                </a>
                <span className="espaco">|</span>
                <a>
                  <span
                    className="carrinho-link"
                    onClick={() => handleQuantidadeProduto(item)}>
                    +
                  </span>
                </a>
                <span className="espaco">|</span>
                <a>
                  <span
                    className="carrinho-link"
                    onClick={() => handleExcluirItem(item)}>
                    Excluir item
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div >
        <p className='carrinho-valorTotal-tag-p'>Total: R$ {quantidade.toFixed(2)}</p>
      </div>
      <button onClick={handleFinalizar}>Finalizar Pedido</button>
    </div>
  );
}

export default ListarCarrinho;
