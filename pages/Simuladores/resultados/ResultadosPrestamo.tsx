import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloResultados.module.css';

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
    const calcularResultados = () => {
      const capitalFloat = parseFloat(capital as string);
      const tasaInteresFloat = parseFloat(tasaInteres as string) / 100 / 12;
      const periodoFloat = parseFloat(periodo as string);

      if (capitalFloat && tasaInteresFloat && periodoFloat) {
        const cuotaCalculada =
          (capitalFloat * tasaInteresFloat) /
          (1 - Math.pow(1 + tasaInteresFloat, -periodoFloat));

        setCuota(cuotaCalculada.toFixed(2));

        const totalInteresesPagados =
          cuotaCalculada * periodoFloat - capitalFloat;
        const totalPagadoCalculado = cuotaCalculada * periodoFloat;

        setTotalIntereses(totalInteresesPagados.toFixed(2));
        setTotalPagado(totalPagadoCalculado.toFixed(2));
      }
    };

    calcularResultados();
  }, [capital, tasaInteres, periodo]);

  const consultarTabla = () => {
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

    router.push({
      pathname: 'TablaPrestamo',
      query: { data: JSON.stringify(data) },
    });
  };

  const volver = () => router.push('/Herramientas');

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Resultados del Préstamo</h2>

      <h2 className={styles.enunciado}>Datos Introducidos</h2>
      <p className={styles.labelText}>Capital inicial: <span className={styles.resultText}>{capital} €</span></p>
      <p className={styles.labelText}>Tasa de interés anual: <span className={styles.resultText}>{tasaInteres}%</span></p>
      <p className={styles.labelText}>Período del préstamo: <span className={styles.resultText}>{periodo} meses</span></p>

      <h2 className={styles.enunciado}>Resultados Estimados</h2>
      <p className={styles.labelText}>Cuota mensual aproximada: <span className={styles.resultText}>{cuota} €</span></p>
      <p className={styles.labelText}>Total de intereses pagados: <span className={styles.resultText}>{totalIntereses} €</span></p>
      <p className={styles.labelText}>Monto total pagado: <span className={styles.resultText}>{totalPagado} €</span></p>
      <p className={styles.noteText}>
        Nota: Los resultados son aproximados y pueden variar según las
        condiciones específicas del préstamo acordado con una entidad
        financiera.
      </p>

      <button
        onClick={consultarTabla}
        className={`${styles.touchableButtonV} ${styles.marginTopButton}`}
      >
        Consultar tabla de amortización
      </button>
      <button
        onClick={volver}
        className={`${styles.touchableButtonV} ${styles.marginTopButton}`}
      >
        Volver
      </button>
    </div>
  );
};

export default ResultadosPrestamo;
