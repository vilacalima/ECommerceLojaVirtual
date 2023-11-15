import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutosEstoquista.css';
import ProdutoService from '../../service/produtoService';
import { Link, useHistory } from 'react-router-dom'; // Importe o Link corretamente
import PadraoHeader from '../header/padraoHeader';

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [produtosPorPagina, setProdutosPorPagina] = useState(10); // Defina a quantidade de produtos por página aqui
  const [buscaParcial, setBuscaParcial] = useState('');
  const history = useHistory();
  
  const loadProducts = async () => {
    const products = await ProdutoService.getAllProduct();
    setProdutos(products)
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("usuario");
    if (loggedInUser == null) {
      history.push(`/login`);
    } else{
      try {
        loadProducts();
      } catch (error) {
        console.log(error);
      }
    }
  }, [pagina, busca, buscaParcial]);

  // const handlePaginacao = (novaPagina) => {
  //   setPagina(novaPagina);
  // };

  const produtosDaPagina = produtos.slice((pagina - 1) * produtosPorPagina, pagina * produtosPorPagina);
  const handlePaginacao = (novaPagina) => {
    setPagina(novaPagina);
  };

  return (
    <div className='listar-produto-estoquista-container'>
      <PadraoHeader pedidos={false}/>
      <h2>Listagem de Produtos</h2>

      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar produto"
          value={buscaParcial}
          onChange={(e) => setBuscaParcial(e.target.value)}
        /> 
      </div>
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Quantidade em Estoque</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosDaPagina.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>R${produto.valor}</td>
              <td>{produto.ativo ? 'Ativo' : 'Desativado'}</td>
              <td>
                <a href={`/alterarProduto/${produto.id}`}>Alterar</a>
                <span className="espaco"></span>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="listar-produto-estoquista-paginacao">
        <button
          onClick={() => handlePaginacao(pagina - 1)}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span className='listar-produto-estoquista-span'>Página {pagina}</span>
        <button
          onClick={() => handlePaginacao(pagina + 1)}
          disabled={produtos.length < produtosPorPagina}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListarProdutos;
