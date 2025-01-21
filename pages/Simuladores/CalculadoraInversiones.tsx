import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraInversiones: React.FC = () => {
  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    time: '',
    contributions: '0',
    tipoInteres: 'anual',
    unidadPeriodo: 'años'
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularCuota = () => {
    const { principal, rate, time, contributions } = formData;
    if (!principal || !rate || !time || !contributions) {
      alert('Por favor, completa todos los campos.');
    } else {
      router.push({
        pathname: 'resultados/ResultadoInversiones',
        query: { ...formData },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Inversiones</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular el crecimiento potencial de tus inversiones a lo largo del tiempo.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="principal" className={styles.label}>Principal</label>
          <p className={styles.inputDescription}>Ingresa la cantidad inicial que planeas invertir.</p>
          <input
            id="principal"
            name="principal"
            type="number"
            value={formData.principal}
            onChange={handleInputChange}
            placeholder="Ej: 10000"
            className={styles.input}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="rate" className={styles.label}>Interés (%)</label>
            <p className={styles.inputDescription}>Especifica la tasa de interés esperada.</p>
            <input
              id="rate"
              name="rate"
              type="number"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Ej: 5"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tipoInteres" className={styles.label}>Tipo de interés</label>
            <p className={styles.inputDescription}>Selecciona si el interés es anual o mensual.</p>
            <select
              id="tipoInteres"
              name="tipoInteres"
              value={formData.tipoInteres}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="anual">Anual</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>Duración</label>
            <p className={styles.inputDescription}>Indica el período de tiempo de la inversión.</p>
            <input
              id="time"
              name="time"
              type="number"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="Ej: 5"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="unidadPeriodo" className={styles.label}>Unidad de tiempo</label>
            <p className={styles.inputDescription}>Elige la unidad de tiempo para la duración.</p>
            <select
              id="unidadPeriodo"
              name="unidadPeriodo"
              value={formData.unidadPeriodo}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="años">Años</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contributions" className={styles.label}>Contribuciones Anuales</label>
          <p className={styles.inputDescription}>Ingresa la cantidad que planeas aportar anualmente.</p>
          <input
            id="contributions"
            name="contributions"
            type="number"
            value={formData.contributions}
            onChange={handleInputChange}
            placeholder="Ej: 1000"
            className={styles.input}
          />
        </div>

        <button type="button" className={styles.button} onClick={calcularCuota}>
          Calcular Inversión
        </button>
      </form>

      <p className={styles.disclaimer}>
        Nota: Esta calculadora es para fines informativos. Los resultados son estimaciones y pueden variar según las condiciones reales del mercado.
      </p>
    </div>
  );
};

export default CalculadoraInversiones;
