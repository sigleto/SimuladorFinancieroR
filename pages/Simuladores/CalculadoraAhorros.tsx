import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

const CalculadoraAhorros = () => {
  const [formData, setFormData] = useState({
    meta: '',
    tasaInteres: '',
    periodo: '',
    tipoInteres: 'anual'
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
    const { meta, tasaInteres, periodo } = formData;
    if (!meta || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      router.push({
        pathname: 'resultados/ResultadoAhorro',
        query: { ...formData },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Ahorros</h1>
      <p className={styles.description}>
        Planifica tus metas financieras calculando cuánto necesitas ahorrar, el impacto de la tasa de interés y el tiempo requerido para alcanzar tus objetivos.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="meta" className={styles.label}>Meta de ahorro</label>
          <input
            id="meta"
            name="meta"
            type="number"
            value={formData.meta}
            onChange={handleInputChange}
            placeholder="Ej: 10000"
            className={styles.input}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="tasaInteres" className={styles.label}>Tasa de interés (%)</label>
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
            <label htmlFor="tipoInteres" className={styles.label}>Tipo de interés</label>
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

        <div className={styles.formGroup}>
          <label htmlFor="periodo" className={styles.label}>Período (años)</label>
          <input
            id="periodo"
            name="periodo"
            type="number"
            value={formData.periodo}
            onChange={handleInputChange}
            placeholder="Ej: 5"
            className={styles.input}
          />
        </div>

        <button type="button" className={styles.button} onClick={calcularCuota}>
          Calcular Ahorro Necesario
        </button>
      </form>

      <p className={styles.disclaimer}>
        Nota: Esta herramienta es para fines informativos y educativos. Los resultados son aproximados y pueden variar según las condiciones reales del mercado financiero.
      </p>
    </div>
  );
};

export default CalculadoraAhorros;
