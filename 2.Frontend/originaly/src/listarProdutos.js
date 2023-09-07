import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarProdutos.css';

function ListarProdutos() {
    const [produtos, setProdutos] = useState([
        { id: 1, codigo: 'P001', nome: 'Produto 1', quantidadeEstoque: 10, valor: 100, ativo: true }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 2, codigo: 'P002', nome: 'Produto 2', quantidadeEstoque: 5, valor: 50, ativo: true }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 3, codigo: 'P003', nome: 'Produto 3', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 4, codigo: 'P004', nome: 'Produto 4', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 5, codigo: 'P005', nome: 'Produto 5', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 6, codigo: 'P006', nome: 'Produto 6', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 7, codigo: 'P007', nome: 'Produto 7', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 8, codigo: 'P008', nome: 'Produto 8', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 9, codigo: 'P009', nome: 'Produto 9', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 10, codigo: 'P010', nome: 'Produto 10', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id:11, codigo: 'P011', nome: 'Produto 11', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
        { id: 12, codigo: 'P012', nome: 'Produto 12', quantidadeEstoque: 8, valor: 80, ativo: false }, //RETIRAR ESSA LINHA QUANDO O BCK FUNCIONAR, ESTA SENDO USADA APENAS PARA VER COMO FICA O LAYOUT
    

        // produtos fictícios 
    ]);
    const [busca, setBusca] = useState('');
    const [pagina, setPagina] = useState(1);
    const produtosPorPagina = 10;
  
    useEffect(() => {
      // Simulação de chamada à API (substitua pela chamada real quando tiver o backend)
      axios.get(`/api/produtos?page=${pagina}&limit=${produtosPorPagina}&busca=${busca}&sort=-dataInsercao`) //INCLUIR DATA DE INSERCAO NO BANDO DE DADOS PARA ELE PODER ORNDENAR DO MAIS ANTIGO PARA O MAIS RECENTE
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar produtos:', error);
        });
    }, [pagina, busca]);
  
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