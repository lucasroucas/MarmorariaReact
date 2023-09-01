import React, { useState, useEffect } from 'react';
import './Clientes.css'; // Importe o arquivo CSS para aplicar o layout
import { Container, Row, Col, Card } from 'react-bootstrap';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [totalPedidosPorCliente, setTotalPedidosPorCliente] = useState({});

  useEffect(() => {
    fetch('http://localhost:5001/clientes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifique se os dados estão chegando corretamente
        setClientes(data);
      })
      .catch((error) => console.error('Erro ao obter clientes:', error));
  }, []);

  useEffect(() => {
    // Função para obter o total de pedidos por cliente
    const getTotalPedidosPorCliente = async (idCliente) => {
      try {
        const response = await fetch(`http://localhost:5001/clientes/${idCliente}/pedidos/total`);

        const data = await response.json();
        return { idCliente, totalPedidos: data.total_pedidos };
      } catch (error) {
        console.error(`Erro ao obter o total de pedidos para o cliente ${idCliente}:`, error);
        return { idCliente, totalPedidos: 0 };
      }
    };

    // Obter o total de pedidos para cada cliente uma vez quando o componente é montado
    const promises = clientes.map((cliente) => getTotalPedidosPorCliente(cliente.id));
    Promise.all(promises).then((results) => {
      const totalPedidosMap = results.reduce((acc, { idCliente, totalPedidos }) => {
        acc[idCliente] = totalPedidos;
        return acc;
      }, {});
      setTotalPedidosPorCliente(totalPedidosMap);
    });
  }, [clientes]);

  return (
    <div>
      <h1>Clientes da Marmoraria</h1>
      <Container>
        <Row>
          {clientes.map((cliente) => (
            <Col
              key={cliente.id}
              xs={12} // Exibe como grade no celular
              md={6}  // Exibe como linha no PC
              lg={4}
              className="cliente-item"
            >
              <Card>
                <Card.Body>
                  <Card.Title>Cliente #{cliente.id}</Card.Title>
                  <Card.Text>
                    <strong>Nome:</strong> {cliente.nome} <br />
                    <strong>Email:</strong> {cliente.email} <br />
                    <strong>Endereço:</strong> {cliente.endereco}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    <strong>Total de Pedidos:</strong> {totalPedidosPorCliente[cliente.id] || 0}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Clientes;
