import React, { useState, useEffect } from 'react';
import './frete.css';
import ClienteService from '../../service/clienteService';
import Endereco from '../cliente/endereco';
import CalculaCep from '../../service/calculadora/calculaCep';
import axios from 'axios';
import CalcularFrete from '../../service/calculadora/calculaCep';

function Frete() {
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [novoEndereco, setNovoEndereco] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clienteLogado, setClienteLogado] = useState(false); 
  const [valorFrete, setValorFrete] = useState(0);
  const [endereco, setEndereco] = useState({
    rua: '',
    bairro: '',
    uf: ''
  });
  const [valores, setValores] = useState([]);
  const [showBox, setShowBox] = useState(false);

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
    localStorage.setItem('InfoFrete', JSON.stringify({ idEndereco: endereco.id, valorFrete: cep.frete, tipoFrete: cep.zona	}));
  };

  const validarCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        alert('CEP inválido');
      } else {
        const enderecos = {
          cep: data.cep,
          rua: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        };

        console.log(enderecos.rua)
        setEndereco({ rua: data.logradouro, bairro: data.bairro, uf: data.uf});
        const valor = CalcularFrete(cep);
        setValores({ padrao: valor.frete, rapido: valor.frete + 10, superRapido: valor.frete + 20 })
        setShowBox(true);
      }
    } catch (error) {
      console.error('Erro ao validar CEP:', error);
    }
  };

  const handleEnderecoChange = (name, value) => {
    const enderecos = [endereco];
    enderecos[name] = value;
    setEndereco({ enderecos });
  };

  return (
    <div className="frete-container">
      <h2>Escolha o Frete</h2>
      {clienteLogado ? null : (
        <div className="opcoes-frete">
          <div>
            <label>CEP:</label>
            <input
              type="text"
              name={`cep`}
              onChange={(e) => handleEnderecoChange('cep', e.target.value)}
              onBlur={(e) => validarCEP(e.target.value)} // Adicione o onBlur para validar o CEP quando sair do campo
              required
            />

          <p>{endereco.rua} {endereco.bairro} {endereco.uf}</p>
          </div>

          {showBox && (
            <div>
              <label>
                <input
                  type="radio"
                  name="frete"
                  value={valores.padrao}
                  checked={freteSelecionado === 'frete1'}
                  onChange={() => handleFreteChange('frete1')}
                />
                Entrega Normal - 7 dias - R${valores.padrao.toFixed(2).replace('.', ',')}
              </label>

              <label>
                <input
                  type="radio"
                  name="frete"
                  value="frete2"
                  checked={freteSelecionado === 'frete2'}
                  onChange={() => handleFreteChange('frete2')}
                />
                Entrega Rápida - 3 dias - R${valores.rapido.toFixed(2).replace('.', ',')}
              </label>

              <label>
                <input
                  type="radio"
                  name="frete"
                  value="frete3"
                  checked={freteSelecionado === 'frete3'}
                  onChange={() => handleFreteChange('frete3')}
                />
                Entrega Super Rápida - 1 dia - R${valores.superRapido.toFixed(2).replace('.', ',')}
              </label>
            </div>
          )}
        </div>
      )}
      
      {loading ? (
      <p>Para finalizar compra é necessário logar...</p>
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
