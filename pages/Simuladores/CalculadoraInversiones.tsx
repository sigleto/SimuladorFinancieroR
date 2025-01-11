import { useState } from 'react';
import { useRouter } from 'next/router'; // Usamos useRouter de Next.js
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraInversiones = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [contributions, setContributions] = useState('0');
  const [tipoInteres, setTipoInteres] = useState('anual');
  const [unidadPeriodo, setUnidadPeriodo] = useState('años');
  
  // Usamos useRouter para la navegación
  const router = useRouter();

  const calcularCuota = () => {
    if (!principal || !rate || !time || !contributions) {
      alert('Por favor, completa todos los campos.');
    } else {
      // Usamos router.push para la navegación con parámetros
      router.push({
        pathname: 'resultados/ResultadoInversiones', // Ruta del resultado
        query: { principal, rate, time, contributions, tipoInteres, unidadPeriodo }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.labelA}>Calculadora de Inversiones</h2>

      <div className={styles.inputContainer}>
        <div className={styles.row}>
          <h3 className={styles.label}>Principal</h3>
          <input
            className={styles.input}
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <h3 className={styles.label}>Interés (%)</h3>
          <div className={styles.pickerContainer}>
            <input
              className={styles.input}
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
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

        <div className={styles.row}>
          <h3 className={styles.label}>Duración</h3>
          <div className={styles.pickerContainer}>
            <input
              className={styles.input}
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <select
              className={styles.picker}
              value={unidadPeriodo}
              onChange={(e) => setUnidadPeriodo(e.target.value)}
            >
              <option value="años">Años</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <h3 className={styles.label}>Contribuciones Anuales</h3>
          <input
            className={styles.input}
            type="number"
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.touchableButton} onClick={calcularCuota}>
        <span className={styles.buttonText}>Calcular</span>
      </button>
    </div>
  );
};

export default CalculadoraInversiones;
