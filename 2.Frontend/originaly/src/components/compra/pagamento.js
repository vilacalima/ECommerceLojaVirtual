import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './pagamento.css';
import CalculadoraService from '../../service/calculadora/calculadoraService';

class PaymentForm extends Component {
  state = {
    paymentMethod: 'pix',
    cardType: 'debit',
    cardNumber: '',
    cardCVC: '',
    cardName: '',
    cardExpiration: '',
    installment: 1,
    subtotal: 0,
  };

  handlePaymentMethodChange = (event) => {
    // localStorage.setItem("opPagamento", JSON.stringify({ opPagamento: "pix"  }));
    localStorage.removeItem('opPagamento');

    if(event.target.value === "card"){
      console.log("entrou aqui")
      localStorage.setItem("opPagamento", JSON.stringify({ opPagamento: "cartao" }));
    } else {
      console.log("entrou aqui no segundo")
      localStorage.setItem("opPagamento", JSON.stringify({ opPagamento: "pix"  }));
    }

    this.setState({ paymentMethod: event.target.value });
  };

  handleCardTypeChange = (event) => {
    this.setState({ cardType: event.target.value });
    localStorage.setItem("dadosCartao", JSON.stringify({ tipoCartao: event.target.value}));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    localStorage.setItem("dadosCartao", JSON.stringify({ [name]: value}));
  };

  handleInstallmentChange = (event) => {
    this.setState({ installment: event.target.value });
    localStorage.setItem("dadosCartao", JSON.stringify({ quantFatura: event.target.value}));
  };

  calculateSubtotal = (totalFrete, totalPedido) => {
    const subtotal = CalculadoraService.calcularTotalPedido(totalFrete, totalPedido);
    this.setState({ subtotal });
  };

  async componentDidMount() {
    // localStorage.setItem("opPagamento", JSON.stringify({ opPagamento: 'pix'  }));
    const frete = localStorage.getItem('ValorFrete');
    const freteJson = JSON.parse(frete);
    const pedido = localStorage.getItem('valorTotalPedidos');
    const pedidoJson = JSON.parse(pedido);
    this.calculateSubtotal(freteJson, pedidoJson);
  }

  isPaymentInfoComplete = () => {
    const { paymentMethod, cardType, cardNumber, cardCVC, cardName, cardExpiration } = this.state;

    if (paymentMethod === 'pix') {
      return true; // Pix não requer informações adicionais
    } else if (paymentMethod === 'card' && cardType && cardNumber && cardCVC && cardName && cardExpiration) {
      return true;
    }

    return false;
  };

  render() {
    const { paymentMethod, cardType } = this.state;

    return (
      <div className='borda'>
        <div>
          <label>
            Forma de pagamento:
            <select onChange={this.handlePaymentMethodChange} value={paymentMethod}>
              <option value="pix">Pix</option>
              <option value="card">Cartão</option>
            </select>
          </label>
        </div>

        {paymentMethod === 'pix' && (
          <div>            
            <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt="QR Code" style={{ width: '150px' }} />
          </div>
        )}

        {paymentMethod === 'card' && (
          <div>
            <label>
              Tipo de cartão:
              <select onChange={this.handleCardTypeChange} value={cardType}>
                <option value="debit">Débito</option>
                <option value="credit">Crédito</option>
              </select>
            </label>

            <input
              type="text"
              name="cardNumber"
              placeholder="Número do Cartão"
              value={this.state.cardNumber}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="cardCVC"
              placeholder="Código Verificador (CVC)"
              value={this.state.cardCVC}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="cardName"
              placeholder="Nome Completo"
              value={this.state.cardName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="cardExpiration"
              placeholder="Data de Vencimento (MM/AA)"
              value={this.state.cardExpiration}
              onChange={this.handleInputChange}
            />

            {cardType === 'debit' ? (
              <label>Pagamento à Vista</label>
            ) : (
              <label>
                Parcelas (Sem Juros):
                <select onChange={this.handleInstallmentChange} value={this.state.installment}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}

        {/* Exiba o subtotal em algum lugar na página, por exemplo: */}
        <div>
          Subtotal: R$ {this.state.subtotal}
        </div>

        {/* <div>
          <button
            onClick={() => {
              if (this.isPaymentInfoComplete()) {
                // Avance para a próxima etapa (Validar pedido final)
                // Coloque sua lógica aqui
              } else {
                alert("Preencha as informações de pagamento corretamente.");
              }
            }}
          >
            Avançar
          </button> */}
        {/* </div> */}
      </div>
    );
  }
}

export default PaymentForm;
