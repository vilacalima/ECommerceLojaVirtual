package com.br.originaly.service;

import com.br.originaly.model.*;
import com.br.originaly.record.CarrinhoRecord;
import com.br.originaly.record.MensagemDTO;
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
    public MensagemDTO save(CarrinhoRecord carrinho){

        int idCliente = _clienteRepository.getIdClient(carrinho.idCliente());

        if(idCliente != 0){
            if(!opcaoPagamento(carrinho.opcaoPagamento()))
                return new MensagemDTO("forma de pagamento invalido", false);

            if(!opcaoFrete(carrinho.opcaoFrete()))
                return new MensagemDTO("opção de frete invalido", false);

            double subtotal = 0;

            List<Carrinho> saveNewCarrinho = new ArrayList<>();

            for (Carrinho dto : carrinho.carrinhoList()) {
                Produto produto = _produtoRepository.getProductById(dto.getIdProduto());

                if(produto != null){
                    double precoTotal = dto.getQuantidade() * produto.getValor();
                    subtotal += precoTotal;

                    saveNewCarrinho.add(map(dto.getIdPedido(), produto.getId(), dto.getQuantidade(), produto.getValor(), precoTotal));
                }

                deleteAllCarrinhoTemporario(idCliente);
            }

            _carrinhoRepository.saveCarrinho(saveNewCarrinho, map(idCliente, carrinho.opcaoPagamento(), subtotal, carrinho.opcaoFrete(), Situacao.CADASTRADO.ordinal()));
        } else{
            return new MensagemDTO("Erro ao encontrar um cliente no banco de dados", true);
        }
        return new MensagemDTO("Pedido salvo com sucesso", true);
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
    public List<CarrinhoTemporario> getAllCarrinhoTemporario(String email){
        return _carrinhoRepository.getCarrinhoTemporario(email);
    }

    /**
     * Retorna a quantidade do carrinho
     * */
    public long getCount(){
        return _carrinhoRepository.getCountCarrinhoTemporario();
    }

    /**
     * Atualiza um item no carrinho temporário
     * @param carrinhoTemporario
     * */
    public MensagemDTO updateCarrinhoTemporario(CarrinhoTemporario carrinhoTemporario){
        boolean itemCarrinho = _carrinhoRepository.updateCarrinhoTemporario(carrinhoTemporario);

        if(itemCarrinho){
            return new MensagemDTO("Item atualizado no carrinho temporário", true);
        } else{
            return new MensagemDTO("Item não foi atualizado no carrinho temporário", false);
        }
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
                situacao
        );
    }

    /**
     * Mapeia um objeto de carrinho
     * @param idPedido
     * @param idProduto
     * @param quantidade
     * @param precoUnitario
     * @param precoTotal
     * */
    @NotNull
    @Contract(value = "_, _, _, _, _ -> new", pure = true)
    private Carrinho map(int idPedido, int idProduto, int quantidade, double precoUnitario, double precoTotal){

        return new Carrinho(
                idPedido,
                idProduto,
                quantidade,
                precoUnitario,
                precoTotal
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
    private boolean opcaoFrete(int opcao){
        return(opcao != OpcaoFrete.GRANDE_SAO_PAULO.ordinal()
                || opcao != OpcaoFrete.INTERIOR.ordinal()
                || opcao != OpcaoFrete.DEMAIS_REGIOES.ordinal());
    }
}
