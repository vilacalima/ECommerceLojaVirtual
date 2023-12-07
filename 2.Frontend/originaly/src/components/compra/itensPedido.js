import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './pagamento.css';
import CarrinhoService from '../../service/carrinhoService';

function ItensPedido(props) {
  const { itens } = props;
  const [produto, setProduto] = useState([]);
  const [mostraCarrinho, setMostraCarrinho] = useState([]);

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
  }, []);

  const loadCarrinho = async (email) => {
    const dto = await CarrinhoService.getPedidoCliente(email)
    setProduto(dto);

    setMostraCarrinho({pagamento: dto.opPagamento});
    console.log(mostraCarrinho.pagamento);

    let precoTotal = 0
    dto.forEach(element => {
      precoTotal += element.precoTotal;
    });

    localStorage.setItem("subtotal", precoTotal);

    console.log(localStorage.getItem("subtotal"));
  };
  
  return (
    <div className='borda'>
      <div>
      <h4 className='meus-pedidos-tag-h4'>Informações do Pagamento: </h4>
        {/* <p className='meus-pedidos-tag-p'>Tipo Frete: {itens.frete}</p> */}
        <p className='meus-pedidos-tag-p'>Opção de Pagamento: {itens.opPagamento}</p>
        <p className='meus-pedidos-tag-p'>Situação: {itens.situacaoVenda}</p>    
      </div>

      
        <div>
          <h4 className='meus-pedidos-tag-h4'>Informações do Frete: </h4>

          <p className='meus-pedidos-tag-p'>CEP: {itens.endereco.cep} Rua: {itens.endereco.rua} Número: {itens.endereco.numero}</p>
          <p className='meus-pedidos-tag-p'>Bairro: {itens.endereco.bairro} Cidade: {itens.endereco.cidade} Complemento: {itens.endereco.complemento}</p>

          <p className='meus-pedidos-tag-p'>Valor frete: R${itens.valorFrete.toFixed(2)}</p>
        </div>
      
        <h4 className='meus-pedidos-tag-h4'>Informações do Produto: </h4>
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Id</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Total Item</th>
          </tr>
        </thead>
        <tbody>
          {itens.carrinho.map((item, index) => (
              <tr key={`${index}`}>
                <td>{item.idProduto}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.precoUnitario.toFixed(2)}</td>
                <td>R$ {item.precoTotal.toFixed(2)}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default ItensPedido;
