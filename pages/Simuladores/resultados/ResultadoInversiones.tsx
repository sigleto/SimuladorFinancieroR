import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloResultados.module.css'; // Importar los estilos

type DataTableEntry = {
  periodo: number;
  saldo: string;
  rendimientoPeriodo: string;
  rendimientoAcumulado: string;
};

export default function ResultadoInversiones() {
  const router = useRouter();
  const { principal, rate, time, contributions, tipoInteres, unidadPeriodo } = router.query;

  const [result, setResult] = useState<string | null>(null);
  const [totalIntereses, setTotalIntereses] = useState<string>('');
  const [totalPagado, setTotalPagado] = useState<string>('');
  const [rendimientoAcumulado, setRendimientoAcumulado] = useState<string>('');
  const [ganancia, setGanancia] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga

  const calculateInvestment = () => {
    if (!principal || !rate || !time || !contributions || !tipoInteres || !unidadPeriodo) return;

    const principalAmount = parseFloat(principal as string);
    const ratePercentage = parseFloat(rate as string) / 100;
    const timePeriod = parseFloat(time as string);
    const annualContributions = parseFloat(contributions as string);

    let totalIntereses = 0;
    let totalPagado = principalAmount;
    let rendimientoAcumulado = 0;

    if (tipoInteres === 'anual' && unidadPeriodo === 'años') {
      for (let i = 0; i < timePeriod; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions + interest;
      }
    } else if (tipoInteres === 'anual' && unidadPeriodo === 'meses') {
      const totalMonths = timePeriod;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * (ratePercentage / 12);
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    } else if (tipoInteres === 'mensual' && unidadPeriodo === 'años') {
      const totalMonths = timePeriod * 12;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    } else if (tipoInteres === 'mensual' && unidadPeriodo === 'meses') {
      const totalMonths = timePeriod;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    }

    rendimientoAcumulado = totalPagado - principalAmount;
    setResult(totalPagado.toFixed(2));
    setTotalIntereses(totalIntereses.toFixed(2));
    setTotalPagado(totalPagado.toFixed(2));
    setRendimientoAcumulado(rendimientoAcumulado.toFixed(2));
    setGanancia(rendimientoAcumulado.toFixed(2));
  };

  useEffect(() => {
    setIsLoading(true); // Se inicia la carga
    calculateInvestment();
    setIsLoading(false); // Se termina la carga
  }, [principal, rate, time, contributions, tipoInteres, unidadPeriodo]);

  const AccesoTabla = () => {
    if (!principal || !rate || !time || !contributions || !tipoInteres || !unidadPeriodo) return;

    const p = parseFloat(principal as string);
    const r = parseFloat(rate as string);
    const t = parseFloat(time as string);
    const c = parseFloat(contributions as string);

    const n = unidadPeriodo === 'años' ? t : t;
    const periodicRate = tipoInteres === 'anual' ? r / 100 : Math.pow(1 + r / 100, 12) - 1;

    let saldoPendiente = p;
    let rendimientoTotal = 0;
    const data: DataTableEntry[] = [];

    for (let i = 1; i <= n; i++) {
      const interesPeriodo = saldoPendiente * (unidadPeriodo === 'años' ? periodicRate : periodicRate / 12);
      const contribucionPeriodo = unidadPeriodo === 'años' ? c : c / 12;
      const valorFuturo = saldoPendiente + interesPeriodo + contribucionPeriodo;
      const rendimientoPeriodo = valorFuturo - saldoPendiente - contribucionPeriodo;

      data.push({
        periodo: i,
        saldo: valorFuturo.toFixed(2),
        rendimientoPeriodo: rendimientoPeriodo.toFixed(2),
        rendimientoAcumulado: (rendimientoTotal + rendimientoPeriodo).toFixed(2),
      });

      rendimientoTotal += rendimientoPeriodo;
      saldoPendiente = valorFuturo;
    }

    router.push({
      pathname: 'TablaInversion',
      query: { data: JSON.stringify(data), unidadPeriodo, rendimientoAcumulado, totalIntereses, totalPagado },
    });
  };

  const volver = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Datos introducidos</h2>
      <p className={styles.labelText}>Capital: <span className={styles.resultText}>{principal}</span></p>
      <p className={styles.labelText}>Tasa de Interés: <span className={styles.resultText}>{rate}%</span></p>
      <p className={styles.labelText}>Período: <span className={styles.resultText}>{time} {unidadPeriodo}</span></p>
      <p className={styles.labelText}>Contribuciones anuales: <span className={styles.resultText}>{contributions}</span></p>

      <h2 className={styles.enunciado}>Resultado</h2>
      {isLoading ? (
        <p>Cargando...</p> // Mensaje de carga
      ) : (
        <>
          <p className={styles.labelText}>Valor futuro: <span className={styles.resultText}>{result}</span></p>
          <p className={styles.labelText}>Rendimiento de la inversión: <span className={styles.resultTextr}>{ganancia}</span></p>
        </>
      )}

      <button onClick={AccesoTabla} className={styles.touchableButton}>Acceso a Tabla</button>
      <button onClick={volver} className={styles.touchableButtonV}>VOLVER</button>
    </div>
  );
}
