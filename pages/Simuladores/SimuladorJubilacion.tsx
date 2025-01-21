import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraJubilacion: React.FC = () => {
  const [formData, setFormData] = useState({
    edadActual: '',
    edadJubilacion: '',
    montoActual: '',
    tasaInteres: ''
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularJubilacion = () => {
    const { edadActual, edadJubilacion, montoActual, tasaInteres } = formData;
    if (!edadActual || !edadJubilacion || !montoActual || !tasaInteres) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    router.push({
      pathname: 'resultados/ResultadoJubilacion',
      query: { ...formData },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Jubilación</h1>
      <p className={styles.description}>
        Planifica tu futuro financiero calculando cuánto necesitarás ahorrar para tu jubilación.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="edadActual" className={styles.label}>Edad actual</label>
          <input
            id="edadActual"
            name="edadActual"
            type="number"
            value={formData.edadActual}
            onChange={handleInputChange}
            placeholder="Ej: 30"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="edadJubilacion" className={styles.label}>Edad de jubilación</label>
          <input
            id="edadJubilacion"
            name="edadJubilacion"
            type="number"
            value={formData.edadJubilacion}
            onChange={handleInputChange}
            placeholder="Ej: 65"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="montoActual" className={styles.label}>Monto actual ahorrado</label>
          <input
            id="montoActual"
            name="montoActual"
            type="number"
            value={formData.montoActual}
            onChange={handleInputChange}
            placeholder="Ej: 50000"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tasaInteres" className={styles.label}>Tasa de interés anual (%)</label>
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

        <button type="button" className={styles.button} onClick={calcularJubilacion}>
          Calcular Jubilación
        </button>
      </form>

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación basada en los datos ingresados. 
        Los resultados reales pueden variar dependiendo de factores económicos y personales.
      </p>
    </div>
  );
};

export default CalculadoraJubilacion;
