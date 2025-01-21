import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

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
  const [formData, setFormData] = useState({
    cantidadIntroducida: '',
    monedaOrigen: 'USD',
    monedaDestino: 'EUR',
  });
  const [tipoCambio, setTipoCambio] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensajeEstado, setMensajeEstado] = useState<string>('');

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const obtenerTipoCambio = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/d93ad7934d4b03cf5de6577a/latest/${formData.monedaOrigen}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data && data.conversion_rates && data.conversion_rates[formData.monedaDestino]) {
          const tasaCambio = data.conversion_rates[formData.monedaDestino];
          setTipoCambio(tasaCambio.toString());
          setMensajeEstado(`Cantidad introducida: ${formData.cantidadIntroducida} ${formData.monedaOrigen}`);
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
    const cantidadFloat = parseFloat(formData.cantidadIntroducida);
    const resultadoCalculado = cantidadFloat * parseFloat(tipoCambio);
    setResultado(resultadoCalculado.toFixed(2).toString());
  };

  const volver = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conversor de Divisas</h1>
      <p className={styles.description}>
        Convierte fácilmente entre múltiples monedas utilizando tasas de cambio en tiempo real.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="cantidadIntroducida" className={styles.label}>Cantidad a convertir</label>
          <input
            id="cantidadIntroducida"
            name="cantidadIntroducida"
            type="number"
            value={formData.cantidadIntroducida}
            onChange={handleInputChange}
            placeholder="Ingrese la cantidad"
            className={styles.input}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="monedaOrigen" className={styles.label}>Moneda de origen</label>
            <select
              id="monedaOrigen"
              name="monedaOrigen"
              value={formData.monedaOrigen}
              onChange={handleInputChange}
              className={styles.select}
            >
              {monedas.map((moneda) => (
                <option key={moneda.codigo} value={moneda.codigo}>
                  {moneda.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="monedaDestino" className={styles.label}>Moneda de destino</label>
            <select
              id="monedaDestino"
              name="monedaDestino"
              value={formData.monedaDestino}
              onChange={handleInputChange}
              className={styles.select}
            >
              {monedas.map((moneda) => (
                <option key={moneda.codigo} value={moneda.codigo}>
                  {moneda.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="button" className={styles.button} onClick={obtenerTipoCambio}>
          Obtener Tipo de Cambio
        </button>

        {tipoCambio && (
          <div className={styles.resultBox}>
            <p>{mensajeEstado}</p>
            <p>Tipo de Cambio: 1 {formData.monedaOrigen} = {tipoCambio} {formData.monedaDestino}</p>
          </div>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="button" className={styles.button} onClick={convertirDivisas}>
          Convertir
        </button>

        {resultado && (
          <p className={styles.resultText}>
            Resultado: {resultado} {formData.monedaDestino}
          </p>
        )}
      </form>

      <button className={styles.secondaryButton} onClick={volver}>
        Volver
      </button>

      <p className={styles.disclaimer}>
        Nota: Las tasas de cambio se actualizan en tiempo real. Los resultados son aproximados y pueden variar ligeramente.
      </p>
    </div>
  );
};

export default ConversorDivisas;
