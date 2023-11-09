package com.br.originaly.repository;

import com.br.originaly.model.Carrinho;
import com.br.originaly.model.CarrinhoTemporario;
import com.br.originaly.model.Pedido;
import com.br.originaly.model.Produto;
import com.br.originaly.record.CarrinhoTemporarioRecord;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Repositório de carrinho de compras
 * */
@Service
public class CarrinhoRepository {

    private final ICarrinhoRepository _carrinhoRepository;
    private final IPedidoRepository _pedidoRepository;
    private final ICarrinhoTemporarioRepository _carrinhoTemporarioRepository;

    public CarrinhoRepository(ICarrinhoRepository carrinhoRepository,
                              IPedidoRepository pedidoRepository,
                              ICarrinhoTemporarioRepository carrinhoTemporarioRepository) {
        this._carrinhoRepository = carrinhoRepository;
        this._pedidoRepository = pedidoRepository;
        this._carrinhoTemporarioRepository = carrinhoTemporarioRepository;
    }

    /**
     * Salva um pedido no banco de dados e posteriormente
     * Salva um item do carrinho no banco de dados
     * @param carrinhoList
     * @param pedido
     */
    public void saveCarrinho(List<Carrinho> carrinhoList, Pedido pedido) {
        Pedido newPedido = _pedidoRepository.save(pedido);

        for (Carrinho carrinho : carrinhoList) {
            carrinho.setIdPedido(newPedido.getId());
            _carrinhoRepository.save(carrinho);
        }
    }

    /**
     * Salva um item do carrinho temporario no banco de dados
     * @param carrinhoTemporario
     */
    public boolean saveCarrinhoTemporario(CarrinhoTemporario carrinhoTemporario){
        CarrinhoTemporario item = _carrinhoTemporarioRepository.save(carrinhoTemporario);
        return item != null;
    }

    /**
     * Retorna uma lista de Carrinho Temporário
     * @param email
     */
    public List<CarrinhoTemporario> getCarrinhoTemporario(String email){
        return _carrinhoTemporarioRepository.getCarrinhoTemporarioByEmailCliente(email);
    }

    /**
     * Retorna a quantidade do carrinho
     */
    public long getCountCarrinhoTemporario(String emailCliente){
        return _carrinhoTemporarioRepository.countByEmailCliente(emailCliente);
    }

    /**
     * Atualiza um item do carrinho temporario no banco de dados
     * @param carrinhoTemporario
     */
    public void updateCarrinhoTemporario(List<CarrinhoTemporario> carrinhoTemporario){
        try{
            for(CarrinhoTemporario item : carrinhoTemporario){
                CarrinhoTemporario updateItem = _carrinhoTemporarioRepository.findById((long) item.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Item não encontrado"));

                updateItem.setQuantidade(item.getQuantidade());
                updateItem.setPrecoUnitario(item.getPrecoUnitario());
                updateItem.setPrecoTotal(item.getPrecoTotal());
                _carrinhoTemporarioRepository.save(updateItem);
            }
        } catch (Exception ex) {
            throw ex;
        }
    }

    /**
     * Deleta um pedido no banco de dados
     * @param email
     */
    public void deleteCarrinhoTemporario(String email){
        List<CarrinhoTemporario> carrinhoTemporarioList =  _carrinhoTemporarioRepository.getCarrinhoTemporarioByEmailCliente(email);
        for(CarrinhoTemporario item : carrinhoTemporarioList){
            _carrinhoTemporarioRepository.delete(item);
        }
    }

    /**
     * Deleta um pedido no banco de dados
     * @param id
     */
    public boolean deleteCarrinhoTemporario(int id){
        CarrinhoTemporario item = _carrinhoTemporarioRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado"));

        if (item != null) {
            _carrinhoTemporarioRepository.deleteById((long) id);
            return true;
        } else {
            return false;
        }
    }
}
