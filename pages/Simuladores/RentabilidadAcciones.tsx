import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../Estilos/EstiloTipoCambio.module.css";

const RentabilidadAcciones: React.FC = () => {
  const [formData, setFormData] = useState({
    symbol: "",
    cantidad: "",
    precioCompra: "",
  });
  const [resultado, setResultado] = useState<string | null>(null);
  const [cotizacionActual, setCotizacionActual] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calcularRentabilidad = async () => {
    try {
      const response = await axios.get(
        `https://api.marketstack.com/v1/tickers/${formData.symbol}/eod/latest?access_key=e811f5a4ab6c227428ab91a111b97014&exchange=XNYS`
      );

      if (response.data) {
        const stockData = response.data;
        const precioActual = stockData.close;
        setCotizacionActual(precioActual);

        const cantidadAccion = parseInt(formData.cantidad);
        const inversionTotal =
          cantidadAccion * parseFloat(formData.precioCompra);
        const valorActual = cantidadAccion * precioActual;
        const rentabilidad = valorActual - inversionTotal;
        setResultado(rentabilidad.toFixed(2).toString());
        setError(null);
      } else {
        setError("El símbolo de la acción no existe.");
      }
    } catch (error) {
      console.error("Error en la solicitud de datos de la acción:", error);
      setError("Error al obtener datos de la acción");
    }
  };

  const volver = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador de Rentabilidad de Acciones</h1>
      <p className={styles.description}>
        Calcula la rentabilidad estimada de tus inversiones en acciones
        utilizando datos de mercado en tiempo real.
      </p>

      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>¿Por qué invertir en acciones?</h2>
        <p className={styles.text}>
          Invertir en acciones puede ser una excelente manera de hacer crecer tu
          patrimonio a largo plazo. Sin embargo, es importante entender los
          riesgos y beneficios antes de comenzar.
        </p>

        <h2 className={styles.subtitle}>¿Cómo funciona esta calculadora?</h2>
        <p className={styles.text}>
          Ingresa el símbolo de la acción (por ejemplo, AAPL para Apple), la
          cantidad de acciones que posees y el precio al que las compraste. La
          calculadora te mostrará la rentabilidad estimada basada en la
          cotización actual de la acción.
        </p>

        <h2 className={styles.subtitle}>Consejos para invertir en acciones</h2>
        <ul className={styles.list}>
          <li>
            <strong>Investiga antes de invertir:</strong> Conoce la empresa y su
            sector antes de comprar sus acciones.
          </li>
          <li>
            <strong>Diversifica tu cartera:</strong> No inviertas todo tu dinero
            en una sola acción. Distribuye tus inversiones para reducir riesgos.
          </li>
          <li>
            <strong>Mantén una perspectiva a largo plazo:</strong> Las acciones
            pueden ser volátiles a corto plazo, pero tienden a generar buenos
            rendimientos a largo plazo.
          </li>
        </ul>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="symbol" className={styles.label}>
            Símbolo de la Acción
          </label>
          <input
            id="symbol"
            name="symbol"
            type="text"
            value={formData.symbol}
            onChange={handleInputChange}
            placeholder="Ej: AAPL"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cantidad" className={styles.label}>
            Cantidad de Acciones
          </label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            value={formData.cantidad}
            onChange={handleInputChange}
            placeholder="Ej: 100"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="precioCompra" className={styles.label}>
            Precio de Compra por Acción
          </label>
          <input
            id="precioCompra"
            name="precioCompra"
            type="number"
            value={formData.precioCompra}
            onChange={handleInputChange}
            placeholder="Ej: 150.50"
            className={styles.input}
          />
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={calcularRentabilidad}
        >
          Calcular Rentabilidad
        </button>
      </form>

      {error && <p className={styles.errorText}>{error}</p>}

      {resultado !== null && cotizacionActual !== null && (
        <div className={styles.resultBox}>
          <h2 className={styles.resultTitle}>Resultados</h2>
          <p>Cotización actual: ${cotizacionActual.toFixed(2)}</p>
          <p>Rentabilidad estimada: ${resultado}</p>
        </div>
      )}

      <button className={styles.toggleButton} onClick={volver}>
        Volver
      </button>

      <p className={styles.disclaimer}>
        Nota: Los cálculos se basan en datos de mercado en tiempo real. La
        rentabilidad pasada no garantiza resultados futuros.
      </p>
    </div>
  );
};

export default RentabilidadAcciones;
