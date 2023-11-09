import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './frete.css';
import axios from 'axios';
import ClienteService from '../../service/clienteService';
import CalcularFrete from '../../service/calculadora/calculaCep';

function Frete() {
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteLogado, setClienteLogado] = useState(false); // Adicione um estado para verificar se o cliente está logado
  const [frete, setFrete] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = localStorage.getItem("usuario");
      
      if (loggedInUser != null){
          const usuarioParse = JSON.parse(loggedInUser);
          
          const endereco = await ClienteService.getAddress(usuarioParse.email);

          console.log(endereco.rua);
          
          setEnderecos(endereco);
          setLoading(false);
          setClienteLogado(true);
          const calc = CalcularFrete(endereco.cep);
          setFrete({ zona: calc.zona, frete: Number(calc.frete).toFixed(2).replace('.', ',') });
          console.log(frete.frete);  
      } 
    };

    fetchData();
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
      <p>Carregando endereço...</p>
    ) : (
      <div>
        {enderecos ? (
          <div>
            <h3>Seu Endereço Cadastrado:</h3>
            <div className="endereco-div">
              <p>Cep: {enderecos.cep}</p>
              <p>Rua: {enderecos.rua}</p>
              <p>Cidade: {enderecos.cidade}</p>
              <h3>Valor do frete: R${frete.frete}</h3>
            </div>
          </div>
        ) : (
          <p>Você não tem endereço cadastrado. Adicione um endereço na sua conta.</p>
        )}
      </div>
    )}

      {/* <Link to="/login" id="finalizar-pedido-button">
        FAZER LOGIN PARA CALCULAR MEU FRETE
      </Link> */}
    </div>
  );
}

export default Frete;
