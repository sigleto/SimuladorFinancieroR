import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';


import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import styles from '../../../Estilos/EstiloResultados.module.css';

// Registra los componentes necesarios de chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ResultadoJubilacionParams {
  edadActual: string;
  edadJubilacion: string;
  montoActual: string;
  tasaInteres: string;
}

interface ResultadoJubilacionState {
  montoFinal: number | null;
}

export default function ResultadoJubilacion() {
  const router = useRouter();

  // Convierte los parámetros de la URL en "unknown" y luego haz el cast a ResultadoJubilacionParams
  const { edadActual, edadJubilacion, montoActual, tasaInteres } = router.query as unknown as ResultadoJubilacionParams;

  const [resultado, setResultado] = useState<ResultadoJubilacionState>({ montoFinal: null });

  const calcularJubilacion = () => {
    const edadActualNumber = parseInt(edadActual ?? '0');
    const edadJubilacionNumber = parseInt(edadJubilacion ?? '0');
    const montoActualNumber = parseFloat(montoActual ?? '0');
    const tasaInteresNumber = parseFloat(tasaInteres ?? '0');

    const tiempoRestante = edadJubilacionNumber - edadActualNumber;
    const montoFinal = montoActualNumber * Math.pow((1 + tasaInteresNumber / 100), tiempoRestante);
    setResultado({ montoFinal });
  };

  useEffect(() => {
    if (edadActual && edadJubilacion && montoActual && tasaInteres) {
      calcularJubilacion();
    }
  }, [edadActual, edadJubilacion, montoActual, tasaInteres]);

  const volver = () => {
    router.push('/');
  };

  // Función para navegar a la página "Cuánto falta para jubilarte"
  const DiasJubilacion = () => {
    router.push('DiasJubilacion');
  };

  const labels = Array.from({ length: parseInt(edadJubilacion ?? '0') - parseInt(edadActual ?? '0') + 1 }, (_, i) => (parseInt(edadActual ?? '0') + i).toString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Proyección de ahorro',
        data: labels.map((_, i) => parseFloat(montoActual ?? '0') * Math.pow((1 + parseFloat(tasaInteres ?? '0') / 100), i)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Datos introducidos</h2>
      <p className={styles.labelText}>Edad actual: <span className={styles.resultText}>{edadActual} años</span></p>
      <p className={styles.labelText}>Edad de jubilación: <span className={styles.resultText}>{edadJubilacion} años</span></p>
      <p className={styles.labelText}>Ahorros actuales: <span className={styles.resultText}>{montoActual}</span></p>
      <p className={styles.labelText}>Tasa de interés anual: <span className={styles.resultText}>{tasaInteres}%</span></p>
      <h2 className={styles.enunciado}>Resultados</h2>
      <p className={styles.labelText}>Monto estimado para la jubilación: <span className={styles.resultText}>{resultado.montoFinal?.toFixed(2) ?? "No disponible"}</span></p>
      <h2 className={styles.enunciado}>Gráfico de rendimiento</h2>
      <Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      
      <button onClick={DiasJubilacion} className={styles.touchableButton}>Cuánto falta para jubilarte</button>
      <button onClick={volver} className={styles.touchableButtonV}>VOLVER</button>
    </div>
  );
}
