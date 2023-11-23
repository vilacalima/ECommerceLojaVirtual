import TableCarrinho from "./tableCarrinho";
import PadraoHeader from "../header/padraoHeader";
import CompEndereco from "../carrinho/compEndereco";
import PaymentStatic from "../compra/pagamentoStatic";
import CarrinhoService from '../../service/carrinhoService';
import BoxResponse from "../util/boxResponse";
import { useState } from "react";


function Checkout(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mensagem, setMensagem] = useState([]);

    const handlerSalvarPedido = async () => {
        const clienteJSON = localStorage.getItem("usuario");
        const freteJSON = localStorage.getItem("frete");
        const pagamentoJSON = localStorage.getItem("opPagamento");
    
        const cliente = JSON.parse(clienteJSON);
        const frete = JSON.parse(freteJSON);
        const pagamento = JSON.parse(pagamentoJSON);
    
        let pag = 0;
        if(pagamento.opcaoPagamento === 'cartao'){
          pag = 1;
        }
    
        const dto = {
          emailCliente: cliente.email,
          opcaoPagamento: pag,
          opcaoFrete: frete.zona,
          valorFrete: frete.frete
        }
    
        const save = await CarrinhoService.save(dto);

        setMensagem("Pedido salvo com sucesso, Id Pedido: " + save);
        setIsAuthenticated(true);
        
    
        // if (save.isSucess){
        //   window.onmessage("Pedido Salvo com sucesso");
        //   setTimeout(() => {
        //   }, 1000);
        // }
    };

    return(
        <div className='pedido-container'>
            <PadraoHeader />
            <h3>Produto</h3>
            <TableCarrinho />
            <h3>Endereço</h3>
            <CompEndereco />
            <h3>Forma de Pagamento</h3>
            <PaymentStatic />

            <button onClick={handlerSalvarPedido}>Finalizar Pedido</button>

            {isAuthenticated && <BoxResponse itens={mensagem} /> }
        </div>
    );
}

export default Checkout;