import React, { useState } from 'react';

const ProdutoForm = () => {
  const [formValues, setFormValues] = useState({
    id_pedido: '',
    id_pedra: '',
    valor_produtos_pedidos: 0,
    quantidade: 0,
    largura_produtos_pedidos: 0,
    comprimento_produtos_pedidos: 0,
    categoria: '',
    obs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const calculateTotal = () => {
    const {
      valor_produtos_pedidos,
      quantidade,
      largura_produtos_pedidos,
      comprimento_produtos_pedidos,
    } = formValues;
    return (
      valor_produtos_pedidos *
      quantidade *
      largura_produtos_pedidos *
      comprimento_produtos_pedidos
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    console.log('Formulário enviado com os seguintes valores:');
    console.log(formValues);
    console.log('Valor Total Calculado:', total);
    // Aqui você pode enviar os dados para o backend ou realizar outras ações necessárias.
  };

  return (
    <div>
      <h2>Lançamento de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Pedido:</label>
          <input
            type="text"
            name="id_pedido"
            value={formValues.id_pedido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID da Pedra:</label>
          <input
            type="text"
            name="id_pedra"
            value={formValues.id_pedra}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Valor do Produto:</label>
          <input
            type="number"
            name="valor_produtos_pedidos"
            value={formValues.valor_produtos_pedidos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={formValues.quantidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Largura:</label>
          <input
            type="number"
            name="largura_produtos_pedidos"
            value={formValues.largura_produtos_pedidos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Comprimento:</label>
          <input
            type="number"
            name="comprimento_produtos_pedidos"
            value={formValues.comprimento_produtos_pedidos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={formValues.categoria}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Observações:</label>
          <textarea
            name="obs"
            value={formValues.obs}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Calcular Total</button>
        </div>
      </form>
      <div>
        <h3>Valor Total Calculado:</h3>
        <p>{calculateTotal()}</p>
      </div>
    </div>
  );
};

export default ProdutoForm;
