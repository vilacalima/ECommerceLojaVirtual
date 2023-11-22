import TableCarrinho from "./tableCarrinho";
import Pagamento from "../compra/pagamento";
import PadraoHeader from "../header/padraoHeader";
import CompEndereco from "../carrinho/compEndereco";
import PaymentStatic from "../compra/pagamentoStatic"


function Checkout(){

    //Lembrar de continuar daqui

    return(
        <div className='pedido-container'>
            <PadraoHeader />
            <h3>Produto</h3>
            <TableCarrinho />
            <h3>Endereço</h3>
            <CompEndereco />
            <PaymentStatic />

            {/* Adicionar forma de pagamento */}
        </div>
    );
}

export default Checkout;