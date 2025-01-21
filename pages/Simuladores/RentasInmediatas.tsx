import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraRentaInmediata: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: '',
    tasaInteres: '',
    periodo: '',
  });
  const [mostrarExplicacion, setMostrarExplicacion] = useState<boolean>(true);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularRentaInmediata = () => {
    const { capital, tasaInteres, periodo } = formData;
    if (!capital || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      setTimeout(() => {
        router.push({
          pathname: 'resultados/ResultadoInmediatas',
          query: { ...formData },
        });
      }, 500);
    }
  };

  const cerrarExplicacion = () => setMostrarExplicacion(false);

  return (
    <div className={styles.container}>
     

      <h1 className={styles.title}>Calculadora de Renta Inmediata</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular los pagos periódicos que recibirías al invertir un capital inicial en una renta inmediata.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="capital" className={styles.label}>Capital Inicial</label>
          <input
            id="capital"
            name="capital"
            type="number"
            value={formData.capital}
            onChange={handleInputChange}
            placeholder="Ej: 100000"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tasaInteres" className={styles.label}>Tasa de Interés (%)</label>
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
          <label htmlFor="periodo" className={styles.label}>Período de Pago (meses)</label>
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

        <button type="button" className={styles.button} onClick={calcularRentaInmediata}>
          Calcular Renta
        </button>
      </form>

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación. Los resultados reales pueden variar dependiendo de las condiciones específicas del producto de renta inmediata.
      </p>
    </div>
  );
};

export default CalculadoraRentaInmediata;
