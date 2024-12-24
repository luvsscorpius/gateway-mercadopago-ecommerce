import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // Carrinho
  const [cart, setCart] = useState([
    { name: 'Produto 1', price: 50, quantity: 1 },
    { name: 'Produto 2', price: 50.0, quantity: 1 },
  ]);

  // Função para realizar o pagamento
  const handleCheckout = async () => {
    try {
      // Envia os dados do carrinho para o backend para criar a preferência de pagamento
      const response = await axios.post('http://localhost:5000/create-payment', {
        items: cart,
      });

      // // Redireciona o usuário para o Mercado Pago para concluir o pagamento
      window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;
    } catch (error) {
      console.error('Erro ao criar a preferência:', error);
    }
  };

  return (
    <div>
      <h1>Loja de Produtos</h1>
      <h2>Carrinho de Compras</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} - R${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Pagar com Mercado Pago</button>
    </div>
  );
};

export default App;
