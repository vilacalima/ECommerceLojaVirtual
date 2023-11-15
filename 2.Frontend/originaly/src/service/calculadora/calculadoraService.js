import axios from 'axios';

const CalculadoraService = {

  calculatePrecoTotal: (quantidade, precoUnit) => {
    const total = quantidade * precoUnit;
    return total.toFixed(2);
  },

  calcularSomaTotal: (dto) => {
    let somaTotal = 0;
  
    for (let i = 0; i < dto.length; i++) {
      somaTotal += dto[i].precoTotal;
    }

    return somaTotal;
  },

  calcularTotalPedido: (frete, pedido) => {
    let somaTotal = 0;

    // Verifique se frete e pedido são números antes de realizar a adição
    if (typeof frete === 'number' && typeof pedido === 'number') {
      somaTotal = frete + pedido;
    } else {
      console.error('Os valores de frete e pedido devem ser números.');
    }
  
    return somaTotal;
  }
};

export default CalculadoraService;