import TableCarrinho from "./tableCarrinho";
import PadraoHeader from "../header/padraoHeader";
import CompEndereco from "../carrinho/compEndereco";
import PaymentStatic from "../compra/pagamentoStatic";
import Pagamento from "../compra/pagamento";
import CarrinhoService from '../../service/carrinhoService';
import BoxResponse from "../util/boxResponse";
import { useEffect, useState } from "react";


function Checkout(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handlerSalvarPedido = async () => {
        const clienteJSON = localStorage.getItem("usuario");
        const freteJSON = localStorage.getItem("frete");
        const pagamentoJSON = localStorage.getItem("opPagamento");
        const infoFreteJson = localStorage.getItem('InfoFrete');
    
        const cliente = JSON.parse(clienteJSON);
        const frete = JSON.parse(freteJSON);
        const pagamento = JSON.parse(pagamentoJSON);
        const infoFrete = JSON.parse(infoFreteJson);
    
        let pag = 0;
        if(pagamento.opcaoPagamento === 'cartao'){
          pag = 1;
        }
    
        const dto = {
          emailCliente: cliente.email,
          opcaoPagamento: pag,
          opcaoFrete: infoFrete.tipoFrete,
          valorFrete: infoFrete.valorFrete,
          idEndereco: infoFrete.idEndereco,
        }
    
        const save = await CarrinhoService.save(dto);

        const m = `Pedido salvo com sucesso, Id Pedido: ${save}`;

        console.log(m)
        setMensagem(m);
        setIsAuthenticated(true);
        

        console.log(mensagem);
        
        setTimeout(() => {
          setShowModal(true);
        }, 1000);
    
        // if (save.isSucess){
        //   window.onmessage("Pedido Salvo com sucesso");
        //   setTimeout(() => {
        //   }, 1000);
        // }
    };

    useEffect(() => {
      
        
      
      console.log(mensagem);
    }, [mensagem]);
    
    const fecharModal = () => {
      setShowModal(false);
    };

    return(
        <div className='pedido-container'>
            <PadraoHeader />
            <h3>Produto</h3>
            <TableCarrinho />
            <h3>Endereço</h3>
            <CompEndereco />
            <h3>Forma de Pagamento</h3>
            <Pagamento />
            {/* <PaymentStatic /> */}

            <button onClick={handlerSalvarPedido}>Finalizar Pedido</button>

            {showModal && (
              <div className="meus-pedidos-modal">
                <div className="meus-pedidos-modal-content">
                  <span className="meus-pedidos-close" onClick={fecharModal}>
                    &times;
                  </span>
                  <BoxResponse itens={mensagem} />
                </div>
              </div>
            )}
            {/* {isAuthenticated && <BoxResponse itens={mensagem} /> } */}
        </div>
    );
}

export default Checkout;