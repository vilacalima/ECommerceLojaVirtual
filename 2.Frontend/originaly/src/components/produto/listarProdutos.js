import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutos.css';
import ProdutoService from '../../service/produtoService';
import { Link } from 'react-router-dom'; 

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [buscaParcial, setBuscaParcial] = useState('');
  const [pagina, setPagina] = useState(1);
  const [produtosPorPagina, setProdutosPorPagina] = useState(10);

  const loadProducts = async () => {
    const products = await ProdutoService.getAllProduct();
    setProdutos(products)
  };

  useEffect(() => {
    try {
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }, [pagina, buscaParcial]);

  
  const handleStatusProduto = async (productId, isChecked) => {
    // Exibir mensagem de confirmação
    const confirmacao = window.confirm(`Tem certeza de que deseja ${isChecked ? 'reativar' : 'inativar'} este produto?`);

    if (!confirmacao) {
      return; // Cancela a ação se o usuário não confirmar
    }

    try {
      const response = ProdutoService.isActive(productId, isChecked);
        
      if (response.ok) {
        console.log('Produto inativado com sucesso');
        
        const updatedProductList = produtos.map(product => {
          if (product.id === productId) {
            return { ...product, ativo: isChecked };
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
                <a href={`/compra/${produto.id}`}>Visualizar</a>
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
