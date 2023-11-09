function CalcularFrete(cepDestino) {
    // Lista de intervalos de CEP e suas zonas correspondentes
    const intervalosCEP = [
        { intervalo: { inicio: '01000', fim: '09999' }, zona: 'Zona A', frete: 15 },
        { intervalo: { inicio: '10000', fim: '19999' }, zona: 'Zona B', frete: 25 },
        { intervalo: { inicio: '20000', fim: '29999' }, zona: 'Zona C', frete: 35 },
    ];

    // Encontre a zona correspondente ao CEP de destino
    const zonaEncontrada = intervalosCEP.find(cepIntervalo => {
        const inicio = cepIntervalo.intervalo.inicio;
        const fim = cepIntervalo.intervalo.fim;
        return cepDestino >= inicio && cepDestino <= fim;
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

    // const resultadoFrete = calcularFrete(cepDestino);
    // console.log(`Para o CEP ${cepDestino}, a zona é ${resultadoFrete.zona} e o frete é de $${resultadoFrete.frete}.`);
}

export default CalcularFrete;

