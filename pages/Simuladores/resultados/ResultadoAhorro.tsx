import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../../Estilos/EstiloResultados.module.css';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RouteParams {
  meta: string;
  tasaInteres: string;
  periodo: string;
  tipoInteres: string;
}

const ResultadoAhorro: React.FC = () => {
  const router = useRouter();

  // Verificación segura de los parámetros
  const { meta, tasaInteres, periodo, tipoInteres } = router.query as unknown as RouteParams;

  const [ahorroNecesario, setAhorroNecesario] = useState<number | null>(null);
  const [graficoData, setGraficoData] = useState<any>(null);

  const calcularAhorroNecesario = () => {
    const metaFloat = parseFloat(meta || '0');
    const tasaInteresFloat = parseFloat(tasaInteres || '0') / 100;
    const periodoFloat = parseFloat(periodo || '0');

    const tasaInteresMensual = tipoInteres === 'anual' ? Math.pow(1 + tasaInteresFloat, 1 / 12) - 1 : tasaInteresFloat;
    const ahorroNecesarioCalculado =
      metaFloat /
      ((Math.pow(1 + tasaInteresMensual, periodoFloat * 12) - 1) / tasaInteresMensual);

    return isNaN(ahorroNecesarioCalculado) ? 0 : ahorroNecesarioCalculado;
  };

  useEffect(() => {
    if (meta && tasaInteres && periodo && tipoInteres) {
      const ahorro = calcularAhorroNecesario();
      setAhorroNecesario(ahorro);

      // Generar el gráfico de ahorro acumulado
      const labels = Array.from({ length: Math.min(10, parseFloat(periodo || '0')) }, (_, i) => `Año ${i + 1}`);
      const data = {
        labels,
        datasets: [
          {
            label: 'Progreso del ahorro acumulado',
            data: Array.from({ length: Math.min(10, parseFloat(periodo || '0')) }, (_, i) => ahorro * 12 * (i + 1)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      };
      setGraficoData(data);
    }
  }, [meta, tasaInteres, periodo, tipoInteres]);

  const volver = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Información introducida</h2>
      <p className={styles.labelText}>Meta de ahorro: <span className={styles.resultText}>{meta} €</span></p>
      <p className={styles.labelText}>Tasa de interés anual: <span className={styles.resultText}>{tasaInteres} %</span></p>
      <p className={styles.labelText}>Período estimado: <span className={styles.resultText}>{periodo} años</span></p>

      <h2 className={styles.enunciado}>Estimación de ahorro</h2>
      <p className={styles.labelText}>Ahorro mensual necesario: <span className={styles.resultText}>{ahorroNecesario?.toFixed(2)} €</span></p>
      <p className={styles.noteText}>Nota: Este cálculo es solo una aproximación. Los resultados pueden variar según las condiciones financieras reales.</p>

      {graficoData ? (
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={graficoData} options={{ responsive: true, maintainAspectRatio: true }} />
          <p className={styles.labelXAxis}>Tiempo en años</p>
        </div>
      ) : (
        <p>No hay datos disponibles para mostrar el gráfico.</p>
      )}

      <button onClick={volver} className={`${styles.touchableButtonV} ${styles.marginTopButton}`}>
        Volver al inicio
      </button>
    </div>
  );
};

export default ResultadoAhorro;

