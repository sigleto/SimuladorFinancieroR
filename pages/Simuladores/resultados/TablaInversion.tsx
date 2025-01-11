import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloTablaInversion.module.css';

type DataTableEntry = {
  periodo: number;
  saldo: string;
  rendimientoPeriodo: string;
  rendimientoAcumulado: string;
};

export default function TablaInversion() {
  const router = useRouter();
  const data: DataTableEntry[] = router.query.data ? JSON.parse(router.query.data as string) : [];
  const unidadPeriodo: string = (router.query.unidadPeriodo as string) || 'años';

  const volver = () => {
    router.push('/');
  };

  const formatPeriodo = (periodo: number) => {
    if (unidadPeriodo === 'meses') {
      const años = Math.floor(periodo / 12);
      const meses = periodo % 12;
      if (años === 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
      if (meses === 0) return `${años} ${años === 1 ? 'año' : 'años'}`;
      return `${años} ${años === 1 ? 'año' : 'años'} y ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    }
    return `${periodo} ${periodo === 1 ? 'año' : 'años'}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Tabla de Inversión</h2>
      <div className={styles['tabla-container']}>
        <table className={styles['tabla-inversion']}>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Saldo</th>
              <th>Rendimiento Periodo</th>
              <th>Rendimiento Acumulado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.periodo.toString()}>
                <td>{formatPeriodo(item.periodo)}</td>
                <td>{item.saldo}</td>
                <td>{item.rendimientoPeriodo}</td>
                <td>{item.rendimientoAcumulado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={volver} className={styles.touchableButton}>
        Volver
      </button>
    </div>
  );
}
