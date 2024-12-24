// Server.js
import express from 'express';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

// Configuração do MercadoPago
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-266725179599368-122416-8641fe984e743c6fe454003e122073b1-1186084980',
});
const payment = new Payment(client);

// Rota para criar o pagamento
app.post('/create-payment', (req, res) => {
    const {items} = req.body

    let total = 0

    // Função para pegar o total do carrinho
    const getTotal = items.forEach((item) => {
        total += item.price
    })

  payment.create({
      body: {
        transaction_amount: total,
        description: 'teste',
        payment_method_id: 'pix',
        payer: {
          email: 'andersonvittor1801@gmail.com',
        },
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
