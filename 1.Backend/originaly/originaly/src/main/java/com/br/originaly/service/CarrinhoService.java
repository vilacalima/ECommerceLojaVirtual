package com.br.originaly.service;

import com.br.originaly.model.*;
import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.CarrinhoTemporarioRecord;
import com.br.originaly.record.MensagemDTO;
import com.br.originaly.record.PedidoRecord;
import com.br.originaly.repository.CarrinhoRepository;
import com.br.originaly.repository.ClienteRepository;
import com.br.originaly.repository.ProdutoRepository;
import com.br.originaly.service.enumerador.OpcaoFrete;
import com.br.originaly.service.enumerador.OpcaoPagamento;
import com.br.originaly.service.enumerador.Situacao;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Serviço de carrinho de compra
 * */
@Service
public class CarrinhoService {

    private final ClienteRepository _clienteRepository;
    private final ProdutoRepository _produtoRepository;
    private final CarrinhoRepository _carrinhoRepository;

    public CarrinhoService(ClienteRepository clienteRepository, ProdutoRepository produtoRepository, CarrinhoRepository carrinhoRepository) {
        _clienteRepository = clienteRepository;
        _produtoRepository = produtoRepository;
        _carrinhoRepository = carrinhoRepository;
    }

    /**
     * Salva dados de um pedido no banco de dados
     * @param carrinho
     * */
    public int save(CarrinhoRecord carrinho) throws Exception {
        Cliente cliente = _clienteRepository.getClientByEmail(carrinho.emailCliente());
        int idCliente = _clienteRepository.getIdClient(cliente.getId());

        if(cliente.getId() != 0){
            List<CarrinhoTemporario> carrinhoTemporario= _carrinhoRepository.getCarrinhoTemporario(cliente.getEmail());

            if(!opcaoPagamento(carrinho.opcaoPagamento()))
                throw new Exception("forma de pagamento invalido");

            if(!opcaoFrete(carrinho.opcaoFrete()))
                throw new Exception("opção de frete invalido");

            double subtotal = 0;

            List<Carrinho> saveNewCarrinho = new ArrayList<>();

            for (CarrinhoTemporario dto : carrinhoTemporario) {
                Produto produto = _produtoRepository.getProductById(dto.getIdProduto());

                if(produto != null){
                    double precoTotal = dto.getQuantidade() * produto.getValor();
                    subtotal += precoTotal;

                    saveNewCarrinho.add(map(produto.getId(), dto.getQuantidade(), produto.getValor(), precoTotal));
                }
            }

            int idPedido = _carrinhoRepository.saveCarrinho(saveNewCarrinho, map(cliente.getId(), carrinho.opcaoPagamento(), subtotal, map(carrinho.opcaoFrete()), Situacao.CADASTRADO.ordinal()));
            deleteAllCarrinhoTemporario(cliente.getId());

            return idPedido;

            //Lembrar de atualizar o produto tirando a quantidade
        } else{
            throw new Exception("Erro ao encontrar um cliente no banco de dados");
        }
    }

    /**
     * Salva um item no carrinho temporário
     * @param carrinhoTemporario
     * */
    public MensagemDTO saveCarrinhoTemporario(CarrinhoTemporario carrinhoTemporario){
        boolean itemCarrinho = _carrinhoRepository.saveCarrinhoTemporario(carrinhoTemporario);

        if(itemCarrinho){
            return new MensagemDTO("Item salvo no carrinho temporário", true);
        } else{
            return new MensagemDTO("Item não foi salvo no carrinho temporário", false);
        }
    }

    /**
     * Retorna todos itens do carrinho temporário
     * @param email
     * */
    public List<CarrinhoTemporarioRecord> getAllCarrinhoTemporario(String email){

        List<CarrinhoTemporarioRecord> dto = new ArrayList<>();
        List<CarrinhoTemporario> listCarrinhoTemporario = _carrinhoRepository.getCarrinhoTemporario(email);

        for(CarrinhoTemporario item : listCarrinhoTemporario){
            Produto produto = _produtoRepository.getProductById(item.getIdProduto());

            dto.add(map(item, produto));
        }

        return dto;
    }

    public List<PedidoRecord> getAllPedido(String email){
        Cliente cliente = _clienteRepository.getClientByEmail(email);
        List<Pedido> pedidoList = _carrinhoRepository.getPedidoByIdCliente(cliente.getId());

        List<PedidoRecord> dto = new ArrayList<>();

        for(Pedido pedido : pedidoList){

            List<Carrinho> carrinhoList = _carrinhoRepository.getAllCarrinho(pedido.getId());

            dto.add(map(pedido, carrinhoList));
        }

        return dto;
    }

    /**
     * Retorna a quantidade do carrinho
     * */
    public long getCount(String email){
        return _carrinhoRepository.getCountCarrinhoTemporario(email);
    }

    /**
     * Atualiza um item no carrinho temporário
     * @param carrinhoTemporario
     * */
    public MensagemDTO updateCarrinhoTemporario(List<CarrinhoTemporario> carrinhoTemporario){
        try{
            _carrinhoRepository.updateCarrinhoTemporario(carrinhoTemporario);
        } catch (Exception ex){
            throw ex;
        }
        return new MensagemDTO("Item atualizado no carrinho temporário", true);
    }

    /**
     * Deleta todos os itens do carrinho temporário
     * @param id
     * */
    private void deleteAllCarrinhoTemporario(int id){
        Cliente cliente = _clienteRepository.getClientById(id);
        _carrinhoRepository.deleteCarrinhoTemporario(cliente.getEmail());
    }

    /**
     * Deleta todos os itens do carrinho temporário
     * @param id
     * */
    public MensagemDTO deleteItemCarrinhoTemporario(int id){
        boolean dto = _carrinhoRepository.deleteCarrinhoTemporario(id);
        if (dto == true){
            return new MensagemDTO("Item deletado com sucesso", true);
        } else{
            return new MensagemDTO("Item não deletado", false);
        }
    }

    /**
     * Retorna todos os pedidos ordenados pela data
     * */
    public List<PedidoRecord> getAllPedidosOrderByData(){
        List<Pedido> pedidoList = _carrinhoRepository.getAllPedidoOrderByDate();

        List<PedidoRecord> dto = new ArrayList<>();

        for(Pedido pedido : pedidoList){

            List<Carrinho> carrinhoList = _carrinhoRepository.getAllCarrinho(pedido.getId());

            dto.add(map(pedido, carrinhoList));
        }

        return dto;
    }

    /**
     * Realiza um update na situação do Pedido
     * @param id
     * @param opSituacao
     * @return
     * */
    public MensagemDTO updateSituacaoPedido(int id, String opSituacao){

        try{
            _carrinhoRepository.UpdateSituacaoPedido(id, Situacao.getDescricaoFromDescricao(opSituacao));
        } catch (Exception ex){
            return new MensagemDTO("Erro fazer update no pedido" + ex.toString(), false);
        }
        return new MensagemDTO("Pedido atualizado com sucesso", true);
    }

    /**
     * Mapeia um objeto de pedido
     * @param idCliente
     * @param opcaoPagamento
     * @param subtotal
     * @param opcaoFrete
     * @param situacao
     * */
    @NotNull
    @Contract(value = "_, _, _, _, _ -> new", pure = true)
    private Pedido map(int idCliente, int opcaoPagamento, double subtotal, int opcaoFrete, int situacao){

        return new Pedido(
                idCliente,
                opcaoPagamento,
                subtotal,
                opcaoFrete,
                situacao,
                new Date()
        );
    }

    /**
     * Mapeia um objeto de carrinhoW
     * @param idProduto
     * @param quantidade
     * @param precoUnitario
     * @param precoTotal
     * */
    @NotNull
    @Contract(value = "_, _, _, _, _ -> new", pure = true)
    private Carrinho map(int idProduto, int quantidade, double precoUnitario, double precoTotal){

        return new Carrinho(
                idProduto,
                quantidade,
                precoUnitario,
                precoTotal
        );
    }

    /**
     * Mapeia o objeto pedidoRecord
     * @param pedido
     * @param carrinhoList
     * @return
     * */
    @NotNull
    @Contract(value = "_, _, _, _, _ -> new", pure = true)
    private PedidoRecord map(Pedido pedido, List<Carrinho> carrinhoList){

        return new PedidoRecord(
                pedido.getId(),
                pedido.getData(),
                OpcaoPagamento.getDescricaoFromOrdinal(pedido.getOpcaoPagamento()),
                pedido.getSubtotal(),
                OpcaoFrete.getDescricaoFromOrdinal(pedido.getOpcaoFrete()),
                Situacao.getDescricaoFromOrdinal(pedido.getSituacao()),
                carrinhoList
        );
    }

    /**
     * Mapeia um objeto de carrinho Temporario
     * @param carrinhoTemporario
     * @param produto
     * */
    @NotNull
    @Contract(value = "_, _, _, _, _ -> new", pure = true)
    private CarrinhoTemporarioRecord map(CarrinhoTemporario carrinhoTemporario, Produto produto){

        return new CarrinhoTemporarioRecord(
                carrinhoTemporario.getId(),
                carrinhoTemporario.getEmailCliente(),
                produto.getId(),
                produto.getNome(),
                carrinhoTemporario.getQuantidade(),
                carrinhoTemporario.getPrecoUnitario(),
                carrinhoTemporario.getPrecoTotal()
        );
    }

    /**
     * Retorna as opções de pagamento
     * @param opcao
     * */
    private boolean opcaoPagamento(int opcao){
        return(opcao != OpcaoPagamento.PIX.ordinal()
                || opcao != OpcaoPagamento.CARTAO.ordinal());
    }

    /**
     * Retorna as opções de frete
     * @param opcao
     * */
    private boolean opcaoFrete(String opcao){
        return(opcao != OpcaoFrete.GRANDE_SAO_PAULO.toString()
                || opcao != OpcaoFrete.INTERIOR.toString()
                || opcao != OpcaoFrete.DEMAIS_REGIOES.toString());
    }

    /**
     * Retorna um inteiro com a opção de frete
     * */
    private int map(String opcao){
        switch (opcao){
            case "Zona A":
                return OpcaoFrete.GRANDE_SAO_PAULO.ordinal();
            case "Zona B":
                return OpcaoFrete.INTERIOR.ordinal();
            case "Zona C":
                return OpcaoFrete.DEMAIS_REGIOES.ordinal();
            default:
                return 0;
        }
    }
}
