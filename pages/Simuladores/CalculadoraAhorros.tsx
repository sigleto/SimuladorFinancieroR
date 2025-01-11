import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraAhorros = () => {
  const [meta, setMeta] = useState('');
  const [tasaInteres, setTasaInteres] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [tipoInteres, setTipoInteres] = useState('anual');
  const router = useRouter();

  const calcularCuota = () => {
    if (!meta || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      router.push({
        pathname: 'resultados/ResultadoAhorro',
        query: { meta, tasaInteres, periodo, tipoInteres },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.labelA}>Calculadora de Ahorros</h2>
      <h2 className={styles.label}>Meta de ahorro</h2>
      <input
        className={styles.input}
        type="number"
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
      />

      <div className={styles.row}>
        <div>
          <h3 className={styles.label}>Tasa de interés (%)</h3>
          <input
            className={styles.input}
            type="number"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
          />
        </div>

        <div>
          <h3 className={styles.label}>Tipo de interés</h3>
          <select
            className={styles.picker}
            value={tipoInteres}
            onChange={(e) => setTipoInteres(e.target.value)}
          >
            <option value="anual">Anual</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>
      </div>

      <h3 className={styles.label}>Período (años)</h3>
      <input
        className={styles.input}
        type="number"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
      />

      <button className={styles.touchableButton} onClick={calcularCuota}>
        <span className={styles.buttonText}>Calcular Ahorro Necesario</span>
      </button>
    </div>
  );
};

export default CalculadoraAhorros;
