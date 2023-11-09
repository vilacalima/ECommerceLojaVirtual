import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './frete.css';
import axios from 'axios';

function Frete() {
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteLogado, setClienteLogado] = useState(false); // Adicione um estado para verificar se o cliente está logado

  useEffect(() => {
    axios.get('/api/cliente/enderecos')
      .then((response) => {
        setEnderecos(response.data);
        setLoading(false);
        setClienteLogado(true); // Define como true se o cliente estiver logado
      })
      .catch((error) => {
        console.error('Erro ao buscar endereços:', error);
        setLoading(false);
      });
  }, []);

  const handleFreteChange = (valorFrete) => {
    setFreteSelecionado(valorFrete);
  };

  const finalizarPedido = () => {
    if (freteSelecionado) {
      window.location.href = '/checkout';
    } else {
      alert('Por favor, escolha uma opção de frete antes de finalizar o pedido.');
    }
  };

  return (
    <div className="frete-container">
      <h2>Escolha o Frete</h2>
      {clienteLogado ? null : ( // Condicional para mostrar os campos de frete apenas se o cliente não estiver logado
        <div className="opcoes-frete">
          <label>
            <input
              type="radio"
              name="frete"
              value="frete1"
              checked={freteSelecionado === 'frete1'}
              onChange={() => handleFreteChange('frete1')}
            />
            Entrega Normal - 7 dias - R$10,00
          </label>
  
          <label>
            <input
              type="radio"
              name="frete"
              value="frete2"
              checked={freteSelecionado === 'frete2'}
              onChange={() => handleFreteChange('frete2')}
            />
            Entrega Rápida - 3 dias - R$15,00
          </label>
  
          <label>
            <input
              type="radio"
              name="frete"
              value="frete3"
              checked={freteSelecionado === 'frete3'}
              onChange={() => handleFreteChange('frete3')}
            />
            Entrega Super Rápida - 1 dia - R$20,00
          </label>
        </div>
      )}
      
      {loading ? (
        <p>Carregando endereços...</p>
      ) : (
        <div>
          {enderecos.length > 0 ? (
            <div>
              <h3>Seus Endereços Cadastrados:</h3>
              {enderecos.map((endereco) => (
                <div key={endereco.id} className="endereco-div">
                  <p>Rua: {endereco.rua}</p>
                  <p>Cidade: {endereco.cidade}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Você não tem endereços cadastrados. Adicione um endereço na sua conta.</p>
          )}
        </div>
      )}

      <Link to="/login" id="finalizar-pedido-button">
        FAZER LOGIN PARA CALCULAR MEU FRETE
      </Link>
    </div>
  );
}

export default Frete;
