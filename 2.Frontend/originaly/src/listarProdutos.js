import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutos.css';
import { Link } from 'react-router-dom'; 

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [buscaParcial, setBuscaParcial] = useState('');
  const [pagina, setPagina] = useState(1);
  const [produtosPorPagina, setProdutosPorPagina] = useState(10);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/product/getAllProduct')
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [pagina, buscaParcial]);

  const handleStatusProduto = async (productId, isChecked) => {
    try {
      const url = `http://localhost:8080/api/product/produtoAtivo/${productId}/${isChecked}`;
      
      const response = await fetch(url, {
        method: 'PUT',
      });
  
      if (response.ok) {
        console.log('Produto inativado com sucesso');
        
        const updatedProductList = produtos.map(product => {
          if (product.id === productId) {
            return { ...product, ativo: false };
          }
          return product;
        });
        setProdutos(updatedProductList);
      } else {
        console.error('Falha ao inativar o produto');
      }
    } catch (error) {
      console.error('Erro ao inativar o produto:', error);
    }
  };

  const handlePaginacao = (novaPagina) => {
    setPagina(novaPagina);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setBuscaParcial(searchTerm);
  };

  // Filtrar produtos com base no termo de busca
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(buscaParcial)
  );

  // Calcular os produtos a serem exibidos na página atual
  const produtosDaPagina = produtosFiltrados.slice(
    (pagina - 1) * produtosPorPagina,
    pagina * produtosPorPagina
  );

  return (
    <div>
      <h2>Listagem de Produtos</h2>

      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar produto"
          value={buscaParcial}
          onChange={handleSearchChange}
        />
        <div className='botao'>
          <Link to="/cadastrarProduto" className="botao-adicionar">
            <span>+</span> Cadastrar Produto
          </Link> 
        </div>
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
                <span className="espaco">|</span>                
                <a href={`#inativar/${produto.id}`}>
                  <span
                    className="link-inativar"
                    onClick={() => handleStatusProduto(produto.id, false)}>
                    Inativar
                  </span>
                </a>
                <span className="espaco">|</span>
                <a href={`#reativar/${produto.id}`}>
                  <span
                    className="link-inativar"
                    onClick={() => handleStatusProduto(produto.id, true)}>
                    Reativar
                  </span>
                </a>
                <span className="espaco">|</span>
                <a href={`#visualizar/${produto.id}`}>Visualizar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginacao">
        <button
          onClick={() => handlePaginacao(pagina - 1)}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span>Página {pagina}</span>
        <button
          onClick={() => handlePaginacao(pagina + 1)}
          disabled={produtosFiltrados.length < produtosPorPagina}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListarProdutos;
