import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutos.css';

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const produtosPorPagina = 10;

  useEffect(() => {
    // Simulação de chamada à API (substitua pela chamada real quando tiver o backend)
    axios.get(`/api/produtos?page=${pagina}&limit=${produtosPorPagina}&busca=${busca}`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [pagina, busca]); // Atualize sempre que a página ou a busca mudar

  // Função para paginar
  const handlePaginacao = (novaPagina) => {
    setPagina(novaPagina);
  };

  return (
    <div>
      <h2>Listagem de Produtos</h2>
      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
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
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.codigo}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidadeEstoque}</td>
              <td>R${produto.valor}</td>
              <td>{produto.ativo ? 'Ativo' : 'Desativado'}</td>
              <td>
                {/* Adicione os links de ação (alterar, inativar, reativar, visualizar) aqui */}
                <a href={`#alterar/${produto.id}`}>Alterar</a>
                <a href={`#inativar/${produto.id}`}>Inativar</a>
                <a href={`#reativar/${produto.id}`}>Reativar</a>
                <a href={`#visualizar/${produto.id}`}>Visualizar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginacao">
        {/* Barra de paginação */}
        <button
          onClick={() => handlePaginacao(pagina - 1)}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span>Página {pagina}</span>
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
