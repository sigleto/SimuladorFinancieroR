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
  const { capital = '0', tasaInteres = '0', periodo = '0' } = router.query as unknown as RouteParams;

  const [rentaMensual, setRentaMensual] = useState<string>('');
  const [graficoData, setGraficoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calcularRentaMensual = (capital: number, tasaInteres: number, periodo: number): number => {
    return (capital * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -periodo));
  };

  useEffect(() => {
    const capitalFloat = parseFloat(capital);
    const tasaInteresFloat = parseFloat(tasaInteres) / 100 / 12;
    const periodoFloat = parseFloat(periodo);

    if (!isNaN(capitalFloat) && !isNaN(tasaInteresFloat) && !isNaN(periodoFloat)) {
      const renta = calcularRentaMensual(capitalFloat, tasaInteresFloat, periodoFloat);
      setRentaMensual(renta.toFixed(2));

      const labels = Array.from({ length: periodoFloat }, (_, i) => (i + 1).toString());
      const data = {
        labels,
        datasets: [
          {
            label: 'Renta Mensual',
            data: labels.map(() => renta.toFixed(2)),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
          },
        ],
      };
      setGraficoData(data);
    }

    setIsLoading(false);
  }, [capital, tasaInteres, periodo]);

  const volver = () => {
    router.push('/');
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Cargando resultados...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Datos Introducidos</h2>
      <p className={styles.labelText}>Capital Inicial: <span className={styles.resultText}>{capital} €</span></p>
      <p className={styles.labelText}>Tasa de Interés: <span className={styles.resultText}>{tasaInteres} %</span></p>
      <p className={styles.labelText}>Período: <span className={styles.resultText}>{periodo} meses</span></p>

      <h2 className={styles.enunciado}>Resultado</h2>
      <p className={styles.labelText}>Renta Mensual: <span className={styles.resultText}>{rentaMensual} €</span></p>

      {graficoData && (
        <div className={styles.graphContainer}>
          <Line data={graficoData} options={{ responsive: true, maintainAspectRatio: false }} />
          <p className={styles.labelXAxis}>Meses</p>
        </div>
      )}

      <button onClick={volver} className={`${styles.touchableButtonV} ${styles.marginTopButton}`}>
        VOLVER
      </button>
    </div>
  );
};

export default ResultadosRentaInmediata;
