import React, { useState, useRef } from "react";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

interface TablaData {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

const CalculadoraPrestamos: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: "10000",
    tasaInteres: "5",
    periodo: "12",
  });
  const [resultado, setResultado] = useState<{
    cuota: string;
    totalIntereses: string;
    totalPagado: string;
    tabla: TablaData[];
  } | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const resultadoRef = useRef<HTMLDivElement | null>(null);

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

    if (
      !capital ||
      !tasaInteres ||
      !periodo ||
      capitalFloat <= 0 ||
      tasaInteresFloat <= 0 ||
      periodoFloat <= 0
    ) {
      alert("Por favor, completa todos los campos con valores válidos.");
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

    setTimeout(() => {
      if (resultadoRef.current) {
        resultadoRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const toggleTabla = () => {
    console.log("Cambiando estado de la tabla");
    setMostrarTabla(!mostrarTabla);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Préstamos</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular las cuotas mensuales de tu
        préstamo y planificar tus pagos.
      </p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="capital" className={styles.label}>
            Capital
          </label>
          <input
            id="capital"
            name="capital"
            type="number"
            value={formData.capital}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tasaInteres" className={styles.label}>
            Tasa de Interés (%)
          </label>
          <input
            id="tasaInteres"
            name="tasaInteres"
            type="number"
            value={formData.tasaInteres}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="periodo" className={styles.label}>
            Período (meses)
          </label>
          <input
            id="periodo"
            name="periodo"
            type="number"
            value={formData.periodo}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={calcularResultados}
        >
          Calcular
        </button>
      </form>

      {resultado && (
        <div ref={resultadoRef} className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados del Préstamo</h2>
          <p>
            Cuota mensual: <span>{resultado.cuota} €</span>
          </p>
          <p>
            Total de intereses: <span>{resultado.totalIntereses} €</span>
          </p>
          <p>
            Monto total pagado: <span>{resultado.totalPagado} €</span>
          </p>

          <button onClick={toggleTabla} className={styles.toggleButton}>
            {mostrarTabla
              ? "Ocultar Tabla de Amortización"
              : "Mostrar Tabla de Amortización"}
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
    </div>
  );
};

export default CalculadoraPrestamos;
