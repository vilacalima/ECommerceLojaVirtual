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
  }
};

export default CalculadoraService;