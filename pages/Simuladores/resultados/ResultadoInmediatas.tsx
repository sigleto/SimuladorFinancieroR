import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../../Estilos/EstiloResultados.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RouteParams {
  capital: string;
  tasaInteres: string;
  periodo: string;
}

const ResultadosRentaInmediata: React.FC = () => {
  const router = useRouter();
  const { capital, tasaInteres, periodo } = router.query as unknown as RouteParams;

  const [rentaMensual, setRentaMensual] = useState<number | null>(null);
  const [graficoData, setGraficoData] = useState<any>(null);

  const calcularRentaMensual = () => {
    const capitalFloat = parseFloat(capital || '0');
    const tasaInteresFloat = parseFloat(tasaInteres || '0') / 100;
    const periodoFloat = parseFloat(periodo || '0');

    // Fórmula de renta inmediata mensual
    const rentaMensualCalculada = (capitalFloat * tasaInteresFloat) / (1 - Math.pow(1 + tasaInteresFloat, -periodoFloat));

    return isNaN(rentaMensualCalculada) ? 0 : rentaMensualCalculada;
  };

  useEffect(() => {
    if (capital && tasaInteres && periodo) {
      const renta = calcularRentaMensual();
      setRentaMensual(renta);

      const labels = Array.from({ length: periodo ? parseInt(periodo) : 0 }, (_, i) => (i + 1).toString());
      const data = {
        labels,
        datasets: [
          {
            label: 'Renta Mensual',
            data: labels.map(() => renta),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
          },
        ],
      };
      setGraficoData(data);
    }
  }, [capital, tasaInteres, periodo]);

  const volver = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Datos Introducidos</h2>
      <p className={styles.labelText}>Capital Inicial: <span className={styles.resultText}>{capital}</span></p>
      <p className={styles.labelText}>Tasa de Interés: <span className={styles.resultText}>{tasaInteres} %</span></p>
      <p className={styles.labelText}>Período: <span className={styles.resultText}>{periodo} meses</span></p>

      <h2 className={styles.enunciado}>Resultado</h2>
      <p className={styles.labelText}>Renta Mensual: <span className={styles.resultText}>{rentaMensual?.toFixed(2)}</span></p>

      {graficoData ? (
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={graficoData} options={{ responsive: true, maintainAspectRatio: true }} />
          <p className={styles.labelXAxis}>Meses</p>
        </div>
      ) : (
        <p>No hay datos disponibles para mostrar el gráfico.</p>
      )}

      <button onClick={volver} className={`${styles.touchableButtonV} ${styles.marginTopButton}`}>
        VOLVER
      </button>
    </div>
  );
};

export default ResultadosRentaInmediata;
