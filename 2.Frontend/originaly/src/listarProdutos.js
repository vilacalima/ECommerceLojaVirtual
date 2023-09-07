import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutos.css';

function ListarProdutos() {
  const [produtos, setProdutos] = useState([
    { id: 1, codigo: 'P001', nome: 'Produto 1', quantidadeEstoque: 10, valor: 100, ativo: true }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
    { id: 2, codigo: 'P002', nome: 'Produto 2', quantidadeEstoque: 5, valor: 50, ativo: true }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
    { id: 3, codigo: 'P003', nome: 'Produto 3', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
    // Adicione mais dados fictícios aqui
  ]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const produtosPorPagina = 10;
  const [buscaParcial, setBuscaParcial] = useState('');

  useEffect(() => {
    // Simulação de chamada à API (substitua pela chamada real quando tiver o backend)
    axios
      .get(`/api/produtos?page=${pagina}&limit=${produtosPorPagina}&busca=${busca}&buscaParcial=${buscaParcial}&sort=-dataInsercao`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [pagina, busca, buscaParcial]);

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
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.codigo}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidadeEstoque}</td>
              <td>R${produto.valor}</td>
              <td>{produto.ativo ? 'Ativo' : 'Desativado'}</td>
              <td>
                <a href={`#alterar/${produto.id}`}>Alterar</a>
                <span className="espaco">|</span>
                <a href={`#inativar/${produto.id}`}>Inativar</a>
                <span className="espaco">|</span>
                <a href={`#reativar/${produto.id}`}>Reativar</a>
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
          disabled={produtos.length < produtosPorPagina}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListarProdutos;
