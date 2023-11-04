import React, { Component } from 'react';
import './paginaDeCompra.css';

class PaginaDeCompra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [
        { id: 1, nome: 'Produto 1', descricao: 'Descrição do Produto 1', preco: 10, quantidade: 1, imagem: 'imagem1.jpg' },
        { id: 2, nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 20, quantidade: 1, imagem: 'imagem2.jpg' },
        // Adicione mais produtos conforme necessário
      ],
      endereco: 'Endereço Padrão',
      custoFrete: 5, // Custo de frete padrão
      custoFreteExpresso: 10, // Custo de frete expresso
      opcaoFrete: 'Frete Padrão', // Estado para rastrear a opção de frete selecionada
    };
  }

  atualizarQuantidade = (produtoId, quantidade) => {
    const { produtos } = this.state;
    const novoProdutos = produtos.map((produto) => {
      if (produto.id === produtoId) {
        return { ...produto, quantidade };
      }
      return produto;
    });
    this.setState({ produtos: novoProdutos });
  };

  removerProduto = (produtoId) => {
    const { produtos } = this.state;
    const novoProdutos = produtos.filter((produto) => produto.id !== produtoId);
    this.setState({ produtos: novoProdutos });
  };

  removerTodosOsProdutos = () => {
    this.setState({ produtos: [] });
  };

  confirmarPedido = () => {
    // Lógica para confirmar o pedido
  };

  // Manipulador de evento para selecionar a opção de frete
  selecionarOpcaoFrete = (opcao) => {
    this.setState({ opcaoFrete: opcao });
  };

  render() {
    const { produtos, endereco, custoFrete, opcaoFrete } = this.state;
    const subtotal = produtos.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );
    const custoFreteExpresso = 10; // Defina o custo de frete expresso aqui
    const totalCompra = subtotal + (opcaoFrete === 'Frete Padrão' ? custoFrete : custoFreteExpresso);

    return (
      <div className="pagina-de-compra">
       <div className="grid-produtos">
  <h2>Produtos para Compra</h2>
  <div className="produtos-container">
    {produtos.map((produto) => (
      <div key={produto.id} className="produto">
        <div className="produto-info">
          <img src={produto.imagem} alt={produto.nome} />
          <div>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p>Preço: ${produto.preco}</p>
          </div>
        </div>
        <div className="quantidade-buttons">
          <button onClick={() => this.atualizarQuantidade(produto.id, produto.quantidade - 1)}>
            &lt;
          </button>
          <span>{produto.quantidade}</span>
          <button onClick={() => this.atualizarQuantidade(produto.id, produto.quantidade + 1)}>
            &gt;
          </button>
          <button onClick={() => this.removerProduto(produto.id)}>Remover</button>
        </div>
      </div>
    ))}
  </div>
  <button onClick={this.removerTodosOsProdutos}>Remover Todos os Produtos</button>
</div>

        <div className="grid-endereco">
          <h2>Seleção de Endereço</h2>
          <p>{endereco}</p>
          <button className="button-editar">Editar</button>
          <button className="button-escolher-outro">Escolher Outro Endereço</button>
          <button className="button-novo-endereco">Novo Endereço</button>
        </div>
        <div className="grid-frete">
          <h2>Informações de Frete</h2>
          <p>Custo de Frete: ${custoFrete}</p>
          <input
            type="radio"
            id="fretePadrao"
            name="opcaoFrete"
            value="Frete Padrão"
            checked={opcaoFrete === 'Frete Padrão'}
            onChange={() => this.selecionarOpcaoFrete('Frete Padrão')}
          />
          <label htmlFor="fretePadrao">Frete Padrão</label>
          <br />
          <input
            type="radio"
            id="freteExpresso"
            name="opcaoFrete"
            value="Frete Expresso"
            checked={opcaoFrete === 'Frete Expresso'}
            onChange={() => this.selecionarOpcaoFrete('Frete Expresso')}
          />
          <label htmlFor="freteExpresso">Frete Expresso</label>
        </div>
        <div className="grid-resumo">
          <h2>Resumo do Pedido</h2>
          <p>Valor Total dos Itens: ${subtotal}</p>
          <p>Valor do Frete: ${opcaoFrete === 'Frete Padrão' ? custoFrete : custoFreteExpresso}</p>
          <p>Total da Compra: ${totalCompra}</p>
          <button onClick={this.confirmarPedido}>Confirmar Pedido</button>
          <button>Continuar Comprando</button>
        </div>
      </div>
    );
  }
}

export default PaginaDeCompra;