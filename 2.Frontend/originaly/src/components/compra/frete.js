import React, { useState, useEffect } from 'react';
import './frete.css';
import ClienteService from '../../service/clienteService';
import Endereco from '../cliente/endereco';
import CalculaCep from '../../service/calculadora/calculaCep';

function Frete() {
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [novoEndereco, setNovoEndereco] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clienteLogado, setClienteLogado] = useState(false); 
  const [valorFrete, setValorFrete] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = localStorage.getItem("usuario");
      
      if (loggedInUser != null){
          const usuarioParse = JSON.parse(loggedInUser);
          
          const endereco = await ClienteService.getAllAddress(usuarioParse.email);

          setEnderecos(endereco);
          setLoading(false);
          setClienteLogado(true);
      } 
    };

    fetchData();
  }, []);

  const handleFreteChange = (valorFrete) => {
    setFreteSelecionado(valorFrete);
  };

  const handlerNovoEndereco = () => {
    setNovoEndereco(true);
  };

  const handlerEndereco = async (id) => {
    const endereco = await ClienteService.getEnderecoById(id);
    const cep  = CalculaCep(endereco.cep);
    setValorFrete(cep.frete);
    localStorage.setItem('InfoFrete', JSON.stringify({ idEndereco: endereco.id, valorFrete: cep.frete }));
  };

  return (
    <div className="frete-container">
      <h2>Escolha o Frete</h2>
      {clienteLogado ? null : (
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
              <label>
                Endereco para envio:
                <select onChange={(e) => handlerEndereco(e.target.value)}>
                  <option>Selecione</option>
                  {enderecos.map((item) => (
                    <option key={item.id} value={item.id}>
                      Id: {item.id} Cep: {item.cep} Rua: {item.rua} Numero: {item.numero}
                    </option>
                  ))}
                </select>

                <p>Valor do Frete: R$ {valorFrete.toFixed(2)}</p>
              </label>

              {novoEndereco === true ? (
                <Endereco />
              ) : (
                <p>Deseja inserir um novo endereço ?</p>
              )}
              <button onClick={handlerNovoEndereco} >Adicionar novo endereço</button>
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
