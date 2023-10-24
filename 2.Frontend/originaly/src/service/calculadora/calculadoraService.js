import axios from 'axios';

const CalculadoraService = {

  calculaFrete: (cep) => {
    const taxaA = 10;
    const taxaB = 15;
    const taxaC = 20;

    
    // Se o destino estiver na Zona A:
    // Intervalo de CEP: 01000-09999
    
    // Taxa de frete = $10

    // Se o destino estiver na Zona B:
    // Intervalo de CEP: 10000-19999
    //     Taxa de frete = $15

    // Se o destino estiver na Zona C:
    // IntervaloCepOutrosEstados
    //     Taxa de frete = $20

  }
  

};

export default CalculadoraService;