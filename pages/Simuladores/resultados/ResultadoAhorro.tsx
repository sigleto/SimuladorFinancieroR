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

  const [ahorroNecesario, setAhorroNecesario] = useState<number | null>(null); // Usamos null para el valor inicial
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

      // Generar el gráfico después de calcular el ahorro necesario
      const labels = Array.from({ length: Math.min(10, parseFloat(periodo || '0')) }, (_, i) => ((i + 1) % 5 === 0 || i === Math.min(10, parseFloat(periodo || '0')) - 1 ? (i + 1).toString() : ''));
      const data = {
        labels,
        datasets: [
          {
            label: 'Ahorro acumulado',
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
      <h2 className={styles.enunciado}>Datos introducidos</h2>
      <p className={styles.labelText}>Meta de ahorro: <span className={styles.resultText}>{meta}</span></p>
      <p className={styles.labelText}>Tasa de Interés: <span className={styles.resultText}>{tasaInteres} %</span></p>
      <p className={styles.labelText}>Período: <span className={styles.resultText}>{periodo} años</span></p>

      <h2 className={styles.enunciado}>Resultado</h2>
      <p className={styles.labelText}>Ahorro necesario mensual: <span className={styles.resultText}>{ahorroNecesario?.toFixed(2)}</span></p>

      {graficoData ? (
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={graficoData} options={{ responsive: true, maintainAspectRatio: true }} />
          <p className={styles.labelXAxis}>Años</p>
        </div>
      ) : (
        <p>No hay datos disponibles para mostrar el gráfico.</p>
      )}

      {/* Separar el botón del gráfico con margen superior */}
      <button onClick={volver} className={`${styles.touchableButtonV} ${styles.marginTopButton}`}>
        VOLVER
      </button>
    </div>
  );
};

export default ResultadoAhorro;
