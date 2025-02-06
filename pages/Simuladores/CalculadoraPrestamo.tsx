import React, { useState, useRef } from "react";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

interface TablaData {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

type FormDataKeys = "capital" | "tasaInteres" | "periodo";

const CalculadoraPrestamos: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    capital: "",
    tasaInteres: "",
    periodo: "",
  });

  const [resultado, setResultado] = useState<{
    cuota: string;
    totalIntereses: string;
    totalPagado: string;
    tabla: TablaData[];
  } | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);

  const resultadoRef = useRef<HTMLDivElement | null>(null);

  const preguntas: {
    label: string;
    name: FormDataKeys;
    placeholder: string;
    descripcion?: string;
  }[] = [
    {
      label: "¿Cuál es el monto del préstamo ($)?",
      name: "capital",
      placeholder: "Ej: 10000",
      descripcion: "Define el monto total que deseas solicitar.",
    },
    {
      label: "¿Cuál es la tasa de interés anual (%)?",
      name: "tasaInteres",
      placeholder: "Ej: 5",
      descripcion: "Indica la tasa de interés que se aplicará al préstamo.",
    },
    {
      label: "¿En cuántos meses deseas pagar el préstamo?",
      name: "periodo",
      placeholder: "Ej: 12",
      descripcion: "Especifica el plazo en meses para pagar el préstamo.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
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

    setMostrarResultados(true);

    setTimeout(() => {
      if (resultadoRef.current) {
        resultadoRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const avanzarPaso = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularResultados();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const toggleTabla = () => {
    setMostrarTabla(!mostrarTabla);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Préstamos</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular las cuotas mensuales de tu
        préstamo y planificar tus pagos.
      </p>

      {!mostrarResultados ? (
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {preguntas[pasoActual].label}
            </label>
            {preguntas[pasoActual].descripcion && (
              <p className={styles.inputDescription}>
                {preguntas[pasoActual].descripcion}
              </p>
            )}
            <input
              type="number"
              name={preguntas[pasoActual].name}
              value={formData[preguntas[pasoActual].name]}
              onChange={handleInputChange}
              placeholder={preguntas[pasoActual].placeholder}
              className={styles.input}
            />
          </div>
          <div className={styles.contButton}>
            <button
              onClick={retrocederPaso}
              disabled={pasoActual === 0}
              className={`${styles.button} ${styles.secondary}`}
            >
              Atrás
            </button>
            <button
              onClick={avanzarPaso}
              className={`${styles.button} ${styles.primary}`}
            >
              {pasoActual === preguntas.length - 1 ? "Calcular" : "Siguiente"}
            </button>
          </div>
        </div>
      ) : (
        <div ref={resultadoRef} className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados del Préstamo</h2>
          <p className={styles.resultText}>
            Cuota mensual: <span>{resultado?.cuota} €</span>
          </p>
          <p className={styles.resultText}>
            Total de intereses: <span>{resultado?.totalIntereses} €</span>
          </p>
          <p className={styles.resultText}>
            Monto total pagado: <span>{resultado?.totalPagado} €</span>
          </p>

          <button onClick={toggleTabla} className={styles.toggleButton}>
            {mostrarTabla
              ? "Ocultar Tabla de Amortización"
              : "Mostrar Tabla de Amortización"}
          </button>
          {mostrarTabla && resultado?.tabla && (
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
          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({
                capital: "",
                tasaInteres: "",
                periodo: "",
              });
              setResultado(null);
              setMostrarTabla(false);
            }}
            className={`${styles.button} ${styles.secondary}`}
          >
            Volver atrás
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPrestamos;
