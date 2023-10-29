import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Cart() {
  // Estado para manter o carrinho
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const product = location.state.product;

  // Função para adicionar um item ao carrinho
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Verifique se a quantidade não excede 2
      if (existingItem.quantity < 2) {
        existingItem.quantity += 1;
        setCart([...cart]);
      }
    } else {
      // Adicione o produto ao carrinho com quantidade 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Função para aumentar a quantidade de um item no carrinho
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity < 2) {
        item.quantity += 1;
      }
      return item;
    });
    setCart(updatedCart);
    // Recalcule o subtotal após aumentar a quantidade
    calculateSubtotal();
  };

  // Função para calcular o subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Função para diminuir a quantidade de um item no carrinho
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    // Recalcule o subtotal após diminuir a quantidade
    calculateSubtotal();
  };

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantidade: {item.quantity}
            <button onClick={() => increaseQuantity(item.id)}>
              <FaPlus /> {/* Ícone de mais */}
            </button>
            <button onClick={() => decreaseQuantity(item.id)}>
              <FaMinus /> {/* Ícone de menos */}
            </button>
          </li>
        ))}
      </ul>
      <p>Subtotal: R$ {calculateSubtotal()}</p>
    </div>
  );
}

export default Cart;
