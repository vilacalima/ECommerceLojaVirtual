import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './pagamento.css';
import CarrinhoService from '../../service/carrinhoService';

function ItensPedido() {
  const [carrinho, setCarrinho] = useState([]);

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
    const dto = await CarrinhoService.getCarrinhoTemporario(email)
    setCarrinho(dto);
  };
  
  return (
    <div className='borda'>
      <div>
        <label>
          Itens do pedido:
        </label>
      </div>

      <div>
        {carrinho.map((item, index) => (
          <div key={index}>
            <p>Produto({index + 1}): {item.nomeProduto} Quantidade: {item.quantidade} <br />  
             Preço Unitário: R$ {item.precoUnitario} Preço Total: R$ {item.precoTotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ItensPedido;
