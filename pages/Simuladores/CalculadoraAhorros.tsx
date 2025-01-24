import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

const CalculadoraAhorros: React.FC = () => {
  const [formData, setFormData] = useState({
    meta: '',
    tasaInteres: '',
    periodo: '',
    tipoInteres: 'anual'
  });
  const [showResults, setShowResults] = useState(false);
  const [ahorroNecesario, setAhorroNecesario] = useState<number | null>(null);
  const [graficoData, setGraficoData] = useState<ChartData | null>(null);

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
      setShowResults(true);
    }
  };

  const calcularAhorroNecesario = () => {
    const { meta, tasaInteres, periodo, tipoInteres } = formData;
    const metaFloat = parseFloat(meta);
    const tasaInteresFloat = parseFloat(tasaInteres) / 100;
    const periodoFloat = parseFloat(periodo);

    const tasaInteresMensual = tipoInteres === 'anual' ? Math.pow(1 + tasaInteresFloat, 1 / 12) - 1 : tasaInteresFloat;
    const ahorroNecesarioCalculado =
      metaFloat /
      ((Math.pow(1 + tasaInteresMensual, periodoFloat * 12) - 1) / tasaInteresMensual);

    return isNaN(ahorroNecesarioCalculado) ? 0 : ahorroNecesarioCalculado;
  };

  useEffect(() => {
    if (showResults) {
      const ahorro = calcularAhorroNecesario();
      setAhorroNecesario(ahorro);

      const labels = Array.from({ length: Math.min(10, parseFloat(formData.periodo)) }, (_, i) => `Año ${i + 1}`);
      setGraficoData({
        labels,
        datasets: [
          {
            label: 'Progreso del ahorro acumulado',
            data: Array.from({ length: Math.min(10, parseFloat(formData.periodo)) }, (_, i) => ahorro * 12 * (i + 1)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      });
    }
  }, [showResults, formData]);

  const volver = () => {
    setShowResults(false);
  };

  if (!showResults) {
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
              className={styles.input}
            >
              <option value="anual">Anual</option>
              <option value="mensual">Mensual</option>
            </select>
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
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.resultados}>
          <h2 className={styles.enunciado}>Información introducida</h2>
          <p className={styles.labelText}>Meta de ahorro: <span className={styles.resultText}>{formData.meta} €</span></p>
          <p className={styles.labelText}>Tasa de interés anual: <span className={styles.resultText}>{formData.tasaInteres} %</span></p>
          <p className={styles.labelText}>Período estimado: <span className={styles.resultText}>{formData.periodo} años</span></p>

          <h2 className={styles.enunciado}>Estimación de ahorro</h2>
          <p className={styles.labelText}>Ahorro mensual necesario: <span className={styles.resultText}>{ahorroNecesario?.toFixed(2)} €</span></p>
          
          {graficoData && (
            <div className={styles.graphContainer}>
              <Line 
                data={graficoData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Ahorro Acumulado (€)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Años'
                      }
                    }
                  }
                }} 
              />
            </div>
          )}

          <button onClick={volver} className={styles.toggleButton}>
            Volver al inicio
          </button>
        </div>

        <p className={styles.disclaimer}>
          Nota: Este cálculo es solo una aproximación. Los resultados pueden variar según las condiciones financieras reales.
        </p>
      </div>
    );
  }
};

export default CalculadoraAhorros;
