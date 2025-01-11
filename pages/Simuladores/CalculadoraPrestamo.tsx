import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Importamos useRouter para la navegación
import styles from '../../Estilos/EstiloCalculadoras.module.css';  // Importamos los estilos

const CalculadoraPrestamos: React.FC = () => {
  const [capital, setCapital] = useState<string>('');
  const [tasaInteres, setTasaInteres] = useState<string>('');
  const [periodo, setPeriodo] = useState<string>('');
  const router = useRouter();  // Usamos el hook useRouter para manejar la navegación

  const calcularCuota = () => {
    if (!capital || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      // Navegamos a la página de resultados pasando los valores como query parameters
      router.push({
        pathname: 'resultados/ResultadosPrestamo',
        query: { capital, tasaInteres, periodo }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.labelA}>Calculadora de Préstamos</h2>

      <div className={styles.inputContainer}>
        <div className={styles.row}>
          <h3 className={styles.label}>Capital</h3>
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
          <h3 className={styles.label}>Período (meses)</h3>
          <input
            className={styles.input}
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.touchableButton} onClick={calcularCuota}>
        <span className={styles.buttonText}>Calcular Cuota</span>
      </button>
    </div>
  );
};

export default CalculadoraPrestamos;
