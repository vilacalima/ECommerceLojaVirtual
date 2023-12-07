import React, { useState, useEffect } from 'react';
import ClienteService from '../../service/clienteService';

function CompEndereco() {
  const [endereco, setEndereco] = useState([]);
  const [valorFrete, setValorFrete] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('InfoFrete');
      const infoFrete = JSON.parse(userToken);

      const {id} = infoFrete.idEndereco;

      console.log(infoFrete.idEndereco);

      const endereco = await ClienteService.getEnderecoById(infoFrete.idEndereco );
      setValorFrete(infoFrete.valorFrete);
      setEndereco(endereco);
    };

    fetchData();
  }, []);

  return (
    <div className='borda'>
      <div>
        <p>CEP: {endereco.cep} Rua: {endereco.rua} Número: {endereco.numero}</p>
        <p>Bairro: {endereco.bairro} Cidade: {endereco.cidade} Complemento: {endereco.complemento}</p>
      </div>
      <div>
        <p>Valor do frete: R$ {valorFrete}</p>
      </div>
    </div>
  );
}

export default CompEndereco;
