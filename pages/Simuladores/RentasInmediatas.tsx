import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

// Simulador de Renta Inmediata
const CalculadoraRentaInmediata: React.FC = () => {
  const [capital, setCapital] = useState<string>('');
  const [tasaInteres, setTasaInteres] = useState<string>('');
  const [periodo, setPeriodo] = useState<string>('');
  const [mostrarExplicacion, setMostrarExplicacion] = useState<boolean>(true); // Estado para mostrar el aviso
  const router = useRouter();

  const calcularRentaInmediata = () => {
    if (!capital || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      // Retraso de 500ms antes de realizar la redirección
      setTimeout(() => {
        router.push({
          pathname: 'resultados/ResultadoInmediatas',
          query: { capital, tasaInteres, periodo },
        });
      }, 500); // Retraso de 500 milisegundos
    }
  };

  const cerrarExplicacion = () => setMostrarExplicacion(false);

  return (
    <div className={styles.container}>
      {mostrarExplicacion && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>¿Qué es una renta inmediata?</h2>
            <p>
              Una renta inmediata es una serie de pagos periódicos que comienzan de inmediato tras invertir un capital inicial. Se utiliza para generar ingresos regulares sin retrasos.
            </p>
            <button className={styles.closeButton} onClick={cerrarExplicacion}>
              Entendido
            </button>
          </div>
        </div>
      )}

      <h2 className={styles.labelA}>Calculadora de Renta Inmediata</h2>
      <div className={styles.inputContainer}>
        <div className={styles.row}>
          <h3 className={styles.label}>Capital Inicial</h3>
          <input
            className={styles.input}
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <h3 className={styles.label}>Tasa de Interés (%)</h3>
          <input
            className={styles.input}
            type="number"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <h3 className={styles.label}>Período de Pago (meses)</h3>
          <input
            className={styles.input}
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.touchableButton} onClick={calcularRentaInmediata}>
        <span className={styles.buttonText}>Calcular Renta</span>
      </button>
    </div>
  );
};

export default CalculadoraRentaInmediata;
