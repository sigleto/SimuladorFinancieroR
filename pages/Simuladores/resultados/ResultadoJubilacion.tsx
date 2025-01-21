import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import Head from 'next/head';

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

// Interfaces con validaciones
interface ResultadoJubilacionParams {
  edadActual: string;
  edadJubilacion: string;
  montoActual: string;
  tasaInteres: string;
}

interface ResultadoJubilacionState {
  montoFinal: number | null;
  errorMensaje?: string;
}

export default function ResultadoJubilacion() {
  const router = useRouter();

  // Conversión segura de parámetros
  const { 
    edadActual, 
    edadJubilacion, 
    montoActual, 
    tasaInteres 
  } = router.query as unknown as ResultadoJubilacionParams;

  // Estado inicial con validaciones
  const [resultado, setResultado] = useState<ResultadoJubilacionState>({ 
    montoFinal: null,
    errorMensaje: ''
  });

  // Función de cálculo robusta
  const calcularJubilacion = () => {
    // Validaciones exhaustivas
    if (!edadActual || !edadJubilacion || !montoActual || !tasaInteres) {
      setResultado({
        montoFinal: null,
        errorMensaje: 'Por favor, complete todos los campos'
      });
      return;
    }

    const edadActualNumber = parseInt(edadActual);
    const edadJubilacionNumber = parseInt(edadJubilacion);
    const montoActualNumber = parseFloat(montoActual);
    const tasaInteresNumber = parseFloat(tasaInteres);

    // Validaciones de números
    if (
      isNaN(edadActualNumber) || 
      isNaN(edadJubilacionNumber) || 
      isNaN(montoActualNumber) || 
      isNaN(tasaInteresNumber)
    ) {
      setResultado({
        montoFinal: null,
        errorMensaje: 'Datos inválidos. Verifique los valores ingresados.'
      });
      return;
    }

    // Validaciones lógicas adicionales
    if (edadJubilacionNumber <= edadActualNumber) {
      setResultado({
        montoFinal: null,
        errorMensaje: 'La edad de jubilación debe ser mayor a la edad actual'
      });
      return;
    }

    const tiempoRestante = edadJubilacionNumber - edadActualNumber;
    const montoFinal = montoActualNumber * Math.pow((1 + tasaInteresNumber / 100), tiempoRestante);
    
    setResultado({ 
      montoFinal,
      errorMensaje: '' 
    });
  };

  // Hook de efecto con validaciones mejoradas
  useEffect(() => {
    if (router.isReady && 
        edadActual && 
        edadJubilacion && 
        montoActual && 
        tasaInteres) {
      calcularJubilacion();
    }
  }, [router.isReady, edadActual, edadJubilacion, montoActual, tasaInteres]);

  // Funciones de navegación
  const volver = () => router.push('/');
  const DiasJubilacion = () => router.push('DiasJubilacion');

  // Generación de datos con validaciones
  const labels = edadActual && edadJubilacion 
    ? Array.from(
        { length: parseInt(edadJubilacion) - parseInt(edadActual) + 1 }, 
        (_, i) => (parseInt(edadActual) + i).toString()
      )
    : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Proyección de ahorro',
        data: labels.map((_, i) => 
          parseFloat(montoActual ?? '0') * 
          Math.pow((1 + parseFloat(tasaInteres ?? '0') / 100), i)
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      {/* Metadatos SEO */}
      <Head>
        <title>Calculadora de Proyección de Jubilación</title>
        <meta 
          name="description" 
          content="Herramienta profesional para calcular tu proyección de ahorro para jubilación" 
        />
        <meta name="keywords" content="jubilación, ahorro, inversión, finanzas personales" />
      </Head>

      <div className={styles.container}>
        {/* Sección de datos introducidos */}
        <h2 className={styles.enunciado}>Datos introducidos</h2>
        <div className={styles.datosContainer}>
          <p className={styles.labelText}>
            Edad actual: <span className={styles.resultText}>{edadActual} años</span>
          </p>
          <p className={styles.labelText}>
            Edad de jubilación: <span className={styles.resultText}>{edadJubilacion} años</span>
          </p>
          <p className={styles.labelText}>
            Ahorros actuales: <span className={styles.resultText}>{montoActual}</span>
          </p>
          <p className={styles.labelText}>
            Tasa de interés anual: <span className={styles.resultText}>{tasaInteres}%</span>
          </p>
        </div>

        {/* Manejo de errores */}
        {resultado.errorMensaje && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{resultado.errorMensaje}</p>
          </div>
        )}

        {/* Resultados con renderizado condicional */}
        {resultado.montoFinal && (
          <>
            <h2 className={styles.enunciado}>Resultados</h2>
            <div className={styles.resultadosContainer}>
              <p className={styles.labelText}>
                Monto estimado para la jubilación: 
                <span className={styles.resultText}>
                  {resultado.montoFinal?.toFixed(2) ?? "No disponible"}
                </span>
              </p>
              
              <h2 className={styles.enunciado}>Gráfico de rendimiento</h2>
              <div className={styles.graficoContainer}>
                <Line 
                  data={data} 
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { position: 'top' } 
                    } 
                  }} 
                />
              </div>
            </div>
          </>
        )}
        
        {/* Contenedor de botones */}
        <div className={styles.botonesContainer}>
          <button 
            onClick={DiasJubilacion} 
            className={styles.touchableButtonV}
          >
            Cuánto falta para jubilarte
          </button>
          <button 
            onClick={volver} 
            className={styles.touchableButtonV}
          >
            VOLVER
          </button>
        </div>
      </div>
    </>
  );
}
