import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloTablaPrestamo.module.css';  // Importa los estilos CSS en módulos

type Item = {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
};

const TablaAmortizacion: React.FC = () => {
  const router = useRouter();
  const data: Item[] = router.query.data ? JSON.parse(router.query.data as string) : [];

  const volver = () => {
    router.push('/Herramientas');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Tabla de Amortización</h2>
      <div className={styles['tabla-container']}>
        <table className={styles['tabla-amortizacion']}>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Cuota</th>
              <th>Interés</th>
              <th>Amortización</th>
              <th>Saldo Pendiente</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.periodo.toString()}>
                <td>{item.periodo}</td>
                <td>{item.cuota}</td>
                <td>{item.interes}</td>
                <td>{item.amortizacion}</td>
                <td>{item.saldoPendiente}</td>
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
};

export default TablaAmortizacion;
