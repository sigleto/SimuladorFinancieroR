import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloResultados.module.css';  // Importa los estilos CSS en módulos

interface TablaData {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

const ResultadosPrestamo: React.FC = () => {
  const router = useRouter();
  const { capital = '0', tasaInteres = '0', periodo = '0' } = router.query;

  const [cuota, setCuota] = useState<string>('');
  const [totalIntereses, setTotalIntereses] = useState<string>('');
  const [totalPagado, setTotalPagado] = useState<string>('');

  useEffect(() => {
    const calculandoFunc = () => {
      const capitalFloat = parseFloat(capital as string);
      const tasaInteresFloat = parseFloat(tasaInteres as string) / 100 / 12;
      const periodoFloat = parseFloat(periodo as string);

      const cuotaCalculada =
        (capitalFloat * tasaInteresFloat) /
        (1 - Math.pow(1 + tasaInteresFloat, -periodoFloat));

      setCuota(cuotaCalculada.toFixed(2));

      const totalInteresesPagados = cuotaCalculada * periodoFloat - capitalFloat;
      const totalPagadoCalculado = cuotaCalculada * periodoFloat;

      setTotalIntereses(totalInteresesPagados.toFixed(2));
      setTotalPagado(totalPagadoCalculado.toFixed(2));
    };

    if (capital && tasaInteres && periodo) {
      calculandoFunc();
    }
  }, [capital, tasaInteres, periodo]);

  const AccesoTabla = () => {
    const data: TablaData[] = [];
    const capitalFloat = parseFloat(capital as string);
    const tasaInteresFloat = parseFloat(tasaInteres as string) / 100 / 12;
    const periodoFloat = parseFloat(periodo as string);

    let saldoPendiente = capitalFloat;

    for (let i = 1; i <= periodoFloat; i++) {
      const cuotaCalculada =
        (capitalFloat * tasaInteresFloat) /
        (1 - Math.pow(1 + tasaInteresFloat, -periodoFloat));

      const interes = saldoPendiente * tasaInteresFloat;
      const amortizacion = cuotaCalculada - interes;

      data.push({
        periodo: i,
        cuota: cuotaCalculada.toFixed(2),
        interes: interes.toFixed(2),
        amortizacion: amortizacion.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
      });

      saldoPendiente -= amortizacion;
    }

    router.push({ pathname: 'TablaPrestamo', query: { data: JSON.stringify(data) } });
  };

  const volver = () => router.push('/Herramientas');

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Datos introducidos</h2>
      <p className={styles.labelText}>Capital: <span className={styles.resultText}>{capital} €</span></p>
      <p className={styles.labelText}>Tasa de Interés: <span className={styles.resultText}>{tasaInteres}%</span></p>
      <p className={styles.labelText}>Período: <span className={styles.resultText}>{periodo} meses</span></p>

      <h2 className={styles.enunciado}>Resultados</h2>
      <p className={styles.labelText}>Cuota Mensual: <span className={styles.resultTextr}>{parseFloat(cuota).toFixed(2)} €</span></p>
      <p className={styles.labelText}>Total Pagado de intereses: <span className={styles.resultText}>{parseFloat(totalIntereses).toFixed(2)} €</span></p>
      <p className={styles.labelText}>Total Pagado al final: <span className={styles.resultText}>{parseFloat(totalPagado).toFixed(2)} €</span></p>

      <div className={styles.buttonContainer}>
        <button onClick={AccesoTabla} className={styles.touchableButton}>Consultar Tabla</button>
        <button onClick={volver} className={styles.touchableButtonV}>Volver</button>
      </div>
    </div>
  );
};

export default ResultadosPrestamo;
