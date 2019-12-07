import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  const [ criptomonedas, guardarCriptomonedas ] = useState([]);
  const [ monedaCotizar, guardarMonedaCotizar ] = useState('');
  const [ criptoCotizar, guardarCriptoCotizar ] = useState('');
  const [ error, guardarError ] = useState(false);

  useEffect(() => {
    const consultarAPI = async() => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const cotizarMoneda = e => {
    e.preventDefault();

    if (monedaCotizar === '' || criptoCotizar === '') {
      guardarError(true);
      return;
    }

    guardarError(false);
    guardarMoneda(monedaCotizar);
    guardarCriptomoneda(criptoCotizar);
  };

  const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

  return (
    <form onSubmit={ cotizarMoneda }>
      { componente }
      <div className="row">
        <label>Elige tu Moneda</label>
        <select
          className="u-full-width"
          onChange={ e => guardarMonedaCotizar(e.target.value) }
        >
          <option value="">- Elige tu Moneda -</option>
          <option value="USD">Dolar Estanounidense</option>
          <option value="ARS">Peso Argentino</option>
          <option value="GBP">Libras</option>
          <option value="EUR">Euro</option>
          <option value="MXN">Peso Mexicano</option>
        </select>
      </div>

      <div className="row">
        <label>Elige tu Criptomoneda</label>
        <select
          className="u-full-width"
          onChange={ e => guardarCriptoCotizar(e.target.value) }
        >
          <option value="">- Elige tu Criptomoneda -</option>
          { criptomonedas.map(criptomoneda => (
            <Criptomoneda
              criptomoneda={ criptomoneda }
              key={ criptomoneda.CoinInfo.Id }
            />
          )) }
        </select>
      </div>
      <input type="submit" className="button-primary u-full-width" value="Calcular" />
    </form>
  );
};

export default Formulario;