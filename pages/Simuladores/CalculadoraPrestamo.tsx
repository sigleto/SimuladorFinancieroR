import React, { useState } from 'react';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

interface TablaData {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

const CalculadoraPrestamos: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: '10000',
    tasaInteres: '5',
    periodo: '12',
  });
  const [resultado, setResultado] = useState<{
    cuota: string;
    totalIntereses: string;
    totalPagado: string;
    tabla: TablaData[];
  } | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calcularResultados = () => {
    const { capital, tasaInteres, periodo } = formData;
    const capitalFloat = parseFloat(capital);
    const tasaInteresFloat = parseFloat(tasaInteres) / 100 / 12;
    const periodoFloat = parseInt(periodo, 10);

    if (!capital || !tasaInteres || !periodo || capitalFloat <= 0 || tasaInteresFloat <= 0 || periodoFloat <= 0) {
      alert('Por favor, completa todos los campos con valores válidos.');
      return;
    }

    const cuota =
      (capitalFloat * tasaInteresFloat) /
      (1 - Math.pow(1 + tasaInteresFloat, -periodoFloat));

    const totalIntereses = cuota * periodoFloat - capitalFloat;
    const totalPagado = cuota * periodoFloat;

    const tabla: TablaData[] = [];
    let saldoPendiente = capitalFloat;

    for (let i = 1; i <= periodoFloat; i++) {
      const interes = saldoPendiente * tasaInteresFloat;
      const amortizacion = cuota - interes;

      tabla.push({
        periodo: i,
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        amortizacion: amortizacion.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
      });

      saldoPendiente -= amortizacion;
    }

    setResultado({
      cuota: cuota.toFixed(2),
      totalIntereses: totalIntereses.toFixed(2),
      totalPagado: totalPagado.toFixed(2),
      tabla,
    });
    setMostrarTabla(false);
  };

  const toggleTabla = () => {
    setMostrarTabla(!mostrarTabla);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Préstamos</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular las cuotas mensuales de tu préstamo y planificar tus pagos.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="capital" className={styles.label}>Capital</label>
          <p className={styles.inputDescription}>Ingresa el monto total del préstamo que deseas solicitar.</p>
          <input
            id="capital"
            name="capital"
            type="number"
            value={formData.capital}
            onChange={handleInputChange}
            placeholder="Ej: 10000"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tasaInteres" className={styles.label}>Tasa de Interés (%)</label>
          <p className={styles.inputDescription}>Especifica la tasa de interés anual del préstamo.</p>
          <input
            id="tasaInteres"
            name="tasaInteres"
            type="number"
            value={formData.tasaInteres}
            onChange={handleInputChange}
            placeholder="Ej: 5"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="periodo" className={styles.label}>Período (meses)</label>
          <p className={styles.inputDescription}>Indica la duración del préstamo en meses.</p>
          <input
            id="periodo"
            name="periodo"
            type="number"
            value={formData.periodo}
            onChange={handleInputChange}
            placeholder="Ej: 12"
            className={styles.input}
          />
        </div>

        <button type="button" className={styles.button} onClick={calcularResultados}>
          Calcular
        </button>
      </form>

      {resultado && (
        <div className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados del Préstamo</h2>
          <p className={styles.labelText}>Cuota mensual aproximada: <span className={styles.resultText}>{resultado.cuota} €</span></p>
          <p className={styles.labelText}>Total de intereses pagados: <span className={styles.resultText}>{resultado.totalIntereses} €</span></p>
          <p className={styles.labelText}>Monto total pagado: <span className={styles.resultText}>{resultado.totalPagado} €</span></p>
          
          <button onClick={toggleTabla} className={styles.toggleButton}>
            {mostrarTabla ? 'Ocultar Tabla de Amortización' : 'Mostrar Tabla de Amortización'}
          </button>

          {mostrarTabla && resultado.tabla && (
            <div>
              <h3 className={styles.tablaTitle}>Tabla de amortización:</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
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
                    {resultado.tabla.map((fila) => (
                      <tr key={fila.periodo}>
                        <td>{fila.periodo}</td>
                        <td>{fila.cuota}</td>
                        <td>{fila.interes}</td>
                        <td>{fila.amortizacion}</td>
                        <td>{fila.saldoPendiente}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación. Las cuotas reales pueden variar según las condiciones específicas del préstamo.
      </p>
    </div>
  );
};

export default CalculadoraPrestamos;
