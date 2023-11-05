import axios from 'axios';

const CalculadoraService = {

  calculaFrete: (cep) => {
    
    const intervalosCEP = [
      { intervalo: { inicio: '01000', fim: '09999' }, zona: 'Zona A', frete: 10 }, 
      { intervalo: { inicio: '10000', fim: '19999' }, zona: 'Zona B', frete: 15 },
      { intervalo: { inicio: '20000', fim: '29999' }, zona: 'Zona C', frete: 20 }, 
    ];

  // Encontre a zona correspondente ao CEP de destino
    const zonaEncontrada = intervalosCEP.find(cepIntervalo => {
        const inicio = cepIntervalo.intervalo.inicio;
        const fim = cepIntervalo.intervalo.fim;
        return cep >= inicio && cep <= fim;
    });

    if (zonaEncontrada) {
        // A zona foi encontrada, retorne o valor de frete correspondente
        return {
            zona: zonaEncontrada.zona,
            frete: zonaEncontrada.frete
        };
    } else {
        // Caso o CEP não esteja em nenhum intervalo conhecido, retorne um valor padrão ou trate de outra forma
        return {
            zona: 'Zona Desconhecida',
            frete: 0 // Ou um valor padrão
        };
    }
    // Se o destino estiver na Zona A:
    // Intervalo de CEP: 01000-09999
    
    // Taxa de frete = $10

    // Se o destino estiver na Zona B:
    // Intervalo de CEP: 10000-19999
    //     Taxa de frete = $15

    // Se o destino estiver na Zona C:
    // IntervaloCepOutrosEstados
    //     Taxa de frete = $20

  },

  calculatePrecoTotal: (quantidade, precoUnit) => {
    return quantidade * precoUnit;
  }
};

export default CalculadoraService;