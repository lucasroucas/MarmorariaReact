import React, { useState } from 'react';
import './App.css';
import Clientes from './components/Clientes';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';




function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      setAddress({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col md={6} className="offset-md-3">
              <Form>
                <Form.Group controlId="formCep">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o CEP"
                    value={cep}
                    onChange={handleCepChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>
                  <BsSearch /> Buscar
                </Button>
              </Form>
              {address.street && (
                <div className="address-result mt-4">
                  <h4>Resultado da Consulta:</h4>
                  <p>Rua: {address.street}</p>
                  <p>Bairro: {address.neighborhood}</p>
                  <p>Cidade: {address.city}</p>
                  <p>Estado: {address.state}</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="mt-5">
        <Row>
          <Col>
            <Clientes />
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;
