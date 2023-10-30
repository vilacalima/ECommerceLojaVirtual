package com.br.originaly.repository;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.Pedido;
import com.br.originaly.model.Produto;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Repositório de carrinho de compras
 * */
@Service
public class CarrinhoRepository {

    private final ICarrinhoRepository _carrinhoRepository;
    private final IPedidoRepository _pedidoRepository;

    public CarrinhoRepository(ICarrinhoRepository carrinhoRepository,
                              IPedidoRepository pedidoRepository) {
        this._carrinhoRepository = carrinhoRepository;
        this._pedidoRepository = pedidoRepository;
    }

    /**
     * Salva um pedido no banco de dados e posteriormente
     * Salva um item do carrinho no banco de dados
     * @param carrinhoList
     * @param pedido
     */
    public void saveCarrinho(List<Carrinho> carrinhoList, Pedido pedido){
        Pedido newPedido = _pedidoRepository.save(pedido);

        for (Carrinho carrinho: carrinhoList) {
            carrinho.setIdProduto(newPedido.getId());
            _carrinhoRepository.save(carrinho);
        }
    }
}
