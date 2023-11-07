import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProdutoService from '../../service/produtoService';
import { Link, useHistory } from 'react-router-dom'; 
import PadraoHeader from '../header/padraoHeader';
import './carrinho.css';
import CarrinhoService from '../../service/carrinhoService';
import CalculadoraService from '../../service/calculadora/calculadoraService';

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
    setCarrinho(dto);
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

  
  const handleQuantidadeProduto = async (item) => {
    const updatedCarrinho = carrinho.map((c) =>
      c.idProduto === item.idProduto ? { ...c, quantidade: c.quantidade + 1, precoTotal:  CalculadoraService.calculatePrecoTotal(c.quantidade, c.precoUnitario)} : c
    );
    setCarrinho(updatedCarrinho);

    const dto = CarrinhoService.updateCarrinhoTemporario(carrinho);

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
      CarrinhoService.updateCarrinhoTemporario(carrinho);
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

  return (
    <div>
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
                    className="link-inativar"
                    onClick={() => handleDiminuirQuantidadeProduto(item)}>
                    -
                  </span>
                </a>
                <span className="espaco">|</span>
                <a>
                  <span
                    className="link-inativar"
                    onClick={() => handleQuantidadeProduto(item)}>
                    +
                  </span>
                </a>
                <span className="espaco">|</span>
                <a>
                  <span
                    className="link-inativar"
                    onClick={() => handleExcluirItem(item)}>
                    Excluir item
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Finalizar Pedido</button>
    </div>
  );
}

export default ListarCarrinho;
