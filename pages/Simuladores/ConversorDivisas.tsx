import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Usamos useRouter en lugar de useNavigate
import styles from '../../Estilos/EstiloCalculadoras.module.css';  // Importamos los estilos

interface Moneda {
  codigo: string;
  nombre: string;
}

const monedas: Moneda[] = [
  { codigo: 'USD', nombre: 'Dólar estadounidense' },
  { codigo: 'EUR', nombre: 'Euro' },
  { codigo: 'AUD', nombre: 'Dólar australiano' },
  { codigo: 'ARS', nombre: 'Peso argentino' },
  { codigo: 'UYU', nombre: 'Peso uruguayo' },
  { codigo: 'CLP', nombre: 'Peso chileno' },
  { codigo: 'COP', nombre: 'Peso colombiano' },
  { codigo: 'PEN', nombre: 'Sol peruano' },
  { codigo: 'PYG', nombre: 'Guaraní paraguayo' },
  { codigo: 'CRC', nombre: 'Colón costarricense' },
  { codigo: 'MXN', nombre: 'Peso mexicano' },
  { codigo: 'BGN', nombre: 'Lev búlgaro' },
  { codigo: 'BRL', nombre: 'Real brasileño' },
  { codigo: 'CAD', nombre: 'Dólar canadiense' },
  { codigo: 'CHF', nombre: 'Franco suizo' },
  { codigo: 'CNY', nombre: 'Yuan chino' },
  { codigo: 'CZK', nombre: 'Corona checa' },
  { codigo: 'DKK', nombre: 'Corona danesa' },
  { codigo: 'GBP', nombre: 'Libra esterlina' },
  { codigo: 'HKD', nombre: 'Dólar de Hong Kong' },
  { codigo: 'HRK', nombre: 'Kuna croata' },
  { codigo: 'HUF', nombre: 'Florín húngaro' },
  { codigo: 'IDR', nombre: 'Rupia indonesia' },
  { codigo: 'ILS', nombre: 'Nuevo séquel israelí' },
  { codigo: 'INR', nombre: 'Rupia india' },
  { codigo: 'ISK', nombre: 'Corona islandesa' },
  { codigo: 'JPY', nombre: 'Yen japonés' },
  { codigo: 'KRW', nombre: 'Won surcoreano' },
  { codigo: 'MYR', nombre: 'Ringgit malasio' },
  { codigo: 'NOK', nombre: 'Corona noruega' },
  { codigo: 'NZD', nombre: 'Dólar neozelandés' },
  { codigo: 'PHP', nombre: 'Peso filipino' },
  { codigo: 'PLN', nombre: 'Złoty polaco' },
  { codigo: 'RON', nombre: 'Leu rumano' },
  { codigo: 'RUB', nombre: 'Rublo ruso' },
  { codigo: 'SEK', nombre: 'Corona sueca' },
  { codigo: 'SGD', nombre: 'Dólar singapurense' },
  { codigo: 'THB', nombre: 'Baht tailandés' },
  { codigo: 'TRY', nombre: 'Lira turca' },
  { codigo: 'ZAR', nombre: 'Rand sudafricano' },
];

const ConversorDivisas: React.FC = () => {
  const [monedaOrigen, setMonedaOrigen] = useState<string>('USD');
  const [monedaDestino, setMonedaDestino] = useState<string>('EUR');
  const [tipoCambio, setTipoCambio] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [cantidadIntroducida, setCantidadIntroducida] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensajeEstado, setMensajeEstado] = useState<string>('');

  const obtenerTipoCambio = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/d93ad7934d4b03cf5de6577a/latest/${monedaOrigen}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data && data.conversion_rates && data.conversion_rates[monedaDestino]) {
          const tasaCambio = data.conversion_rates[monedaDestino];
          setTipoCambio(tasaCambio.toString());
          setMensajeEstado(`Cantidad introducida: ${cantidadIntroducida} ${monedaOrigen}`);
          setError('');
        } else {
          setError('Error: La moneda de origen o destino no está disponible.');
        }
      } else {
        setError('Error al obtener el tipo de cambio');
      }
    } catch (error) {
      setError('Error en la solicitud de tipo de cambio');
    }
  };

  const convertirDivisas = () => {
    if (tipoCambio === '') {
      setError('Primero debes obtener el tipo de cambio');
      return;
    }

    setError('');
    const cantidadFloat = parseFloat(cantidadIntroducida);
    const resultadoCalculado = cantidadFloat * parseFloat(tipoCambio);
    setResultado(resultadoCalculado.toFixed(2).toString());
  };

  const router = useRouter();  // Usamos useRouter para la navegación
  const volver = () => {
    router.push('/');  // Navegamos a la página principal
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.labelA}>Conversor de Divisas</h2>
      
      <div className={styles.row}>
        <h3 className={styles.label}>Cantidad a convertir</h3>
        <input
          className={styles.input}
          type="number"
          value={cantidadIntroducida}
          onChange={(e) => setCantidadIntroducida(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <h3 className={styles.label}>Moneda de origen</h3>
        <select
          className={styles.picker}
          value={monedaOrigen}
          onChange={(e) => setMonedaOrigen(e.target.value)}
        >
          {monedas.map((moneda) => (
            <option key={moneda.codigo} value={moneda.codigo}>
              {moneda.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <h3 className={styles.label}>Moneda de destino</h3>
        <select
          className={styles.picker}
          value={monedaDestino}
          onChange={(e) => setMonedaDestino(e.target.value)}
        >
          {monedas.map((moneda) => (
            <option key={moneda.codigo} value={moneda.codigo}>
              {moneda.nombre}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.touchableButton} onClick={obtenerTipoCambio}>
        <span className={styles.buttonText}>Obtener Tipo de Cambio</span>
      </button>

      {tipoCambio && (
        <div>
          <p>{mensajeEstado}</p>
          <p>Tipo de Cambio: 1 {monedaOrigen} = {tipoCambio} {monedaDestino}</p>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}

      <button className={styles.touchableButton} onClick={convertirDivisas}>
        <span className={styles.buttonText}>Convertir</span>
      </button>

      {resultado && <p className={styles.resultText}>Resultado: {resultado} {monedaDestino}</p>}

      <button className={styles.touchableButtonV} onClick={volver}>
        <span className={styles.buttonTextV}>VOLVER</span>
      </button>
    </div>
  );
};

export default ConversorDivisas;
