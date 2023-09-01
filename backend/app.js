const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5001;

// Configuração do banco de dados
const pool = mysql.createPool({
  host: '10.0.0.134:8080',
  user: 'root',
  password: '',
  database: 'marmoraria',
});

app.use(cors());
app.use(express.json());

// Rota para obter clientes da marmoraria
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter clientes:', err);
      res.status(500).json({ error: 'Erro ao obter clientes' });
      return;
    }
    res.json(result);
  });
});

// Função para obter o total de pedidos por cliente
async function getTotalPedidosPorCliente(idCliente) {
  const query = 'SELECT COUNT(*) as total_pedidos FROM pedidos WHERE id_cliente = ?';
  const values = [idCliente];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao obter o total de pedidos por cliente:', err);
        reject(err);
        return;
      }
      resolve(result[0].total_pedidos);
    });
  });
}

// Defina a rota para obter o total de pedidos por cliente
app.get('/clientes/:id/pedidos/total', async (req, res) => {


  const idCliente = req.params.id;
  try {
    const totalPedidos = await getTotalPedidosPorCliente(idCliente);
    res.json({ total_pedidos: totalPedidos });
  } catch (error) {
    console.error(`Erro ao obter o total de pedidos para o cliente ${idCliente}:`, error);
    res.status(500).json({ error: 'Erro ao obter o total de pedidos' });
  }
});

// Encerrando o pool de conexões quando o servidor é encerrado
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error('Erro ao encerrar o pool de conexões:', err);
    }
    console.log('Pool de conexões encerrado.');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
