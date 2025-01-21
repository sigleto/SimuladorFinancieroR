import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraPrestamos: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: '',
    tasaInteres: '',
    periodo: ''
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularCuota = () => {
    const { capital, tasaInteres, periodo } = formData;
    if (!capital || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      router.push({
        pathname: 'resultados/ResultadosPrestamo',
        query: { ...formData },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Préstamos</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular las cuotas mensuales de tu préstamo y planificar tus pagos.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="capital" className={styles.label}>Capital</label>
          <p className={styles.inputDescription}>Ingresa el monto total del préstamo que deseas solicitar.</p>
          <input
            id="capital"
            name="capital"
            type="number"
            value={formData.capital}
            onChange={handleInputChange}
            placeholder="Ej: 10000"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tasaInteres" className={styles.label}>Tasa de Interés (%)</label>
          <p className={styles.inputDescription}>Especifica la tasa de interés anual del préstamo.</p>
          <input
            id="tasaInteres"
            name="tasaInteres"
            type="number"
            value={formData.tasaInteres}
            onChange={handleInputChange}
            placeholder="Ej: 5"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="periodo" className={styles.label}>Período (meses)</label>
          <p className={styles.inputDescription}>Indica la duración del préstamo en meses.</p>
          <input
            id="periodo"
            name="periodo"
            type="number"
            value={formData.periodo}
            onChange={handleInputChange}
            placeholder="Ej: 12"
            className={styles.input}
          />
        </div>

        <button type="button" className={styles.button} onClick={calcularCuota}>
          Calcular Cuota
        </button>
      </form>

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación. Las cuotas reales pueden variar según las condiciones específicas del préstamo.
      </p>
    </div>
  );
};

export default CalculadoraPrestamos;
