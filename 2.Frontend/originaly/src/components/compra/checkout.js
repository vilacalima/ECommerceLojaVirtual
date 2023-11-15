import TableCarrinho from "../carrinho/tableCarrinho";
import Frete from "./frete";
import Pagamento from "./pagamento";

function Checkout(){

    //Lembrar de continuar daqui

    return(
        <div>
            <TableCarrinho />
            <Frete />
            <Pagamento />
        </div>
    );
}

export default Checkout;