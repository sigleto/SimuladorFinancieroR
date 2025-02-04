import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AmortizacionItem {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

type FormDataKeys = "capital" | "plazo" | "interes";

const CalculadoraHipotecaria: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    capital: "",
    plazo: "",
    interes: "",
  });

  const [resultado, setResultado] = useState<{
    cuotaMensual: string;
    totalIntereses: string;
    totalPagado: string;
    tablaAmortizacion: AmortizacionItem[];
  } | null>(null);

  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [error, setError] = useState<string>("");

  const preguntas = [
    {
      label: "¿Cuál es el capital del préstamo (€)?",
      name: "capital" as FormDataKeys,
      placeholder: "Ej: 200000",
      descripcion: "Introduce el importe total del préstamo hipotecario.",
    },
    {
      label: "¿Cuál es el plazo del préstamo (años)?",
      name: "plazo" as FormDataKeys,
      placeholder: "Ej: 30",
      descripcion: "Indica el plazo total del préstamo en años.",
    },
    {
      label: "¿Cuál es el tipo de interés anual (%)?",
      name: "interes" as FormDataKeys,
      placeholder: "Ej: 2.5",
      descripcion:
        "Introduce el tipo de interés anual aplicado al préstamo hipotecario.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarEntradas = (): boolean => {
    const currentField = preguntas[pasoActual].name;
    const value = formData[currentField];

    if (!value) {
      setError("Por favor, complete este campo.");
      return false;
    }

    if (isNaN(Number(value)) || Number(value) <= 0) {
      setError("Por favor, ingrese un valor numérico positivo.");
      return false;
    }

    setError("");
    return true;
  };

  const avanzarPaso = () => {
    if (!validarEntradas()) return;

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

  const calcularResultados = () => {
    const capitalInicial = parseFloat(formData.capital || "0");
    const plazoMeses = parseInt(formData.plazo || "0") * 12;
    const tasaInteresMensual = parseFloat(formData.interes || "0") / 100 / 12;

    const cuota =
      (capitalInicial *
        tasaInteresMensual *
        Math.pow(1 + tasaInteresMensual, plazoMeses)) /
      (Math.pow(1 + tasaInteresMensual, plazoMeses) - 1);

    const totalPagado = cuota * plazoMeses;
    const totalIntereses = totalPagado - capitalInicial;

    // Calcular tabla de amortización
    let saldoPendiente = capitalInicial;
    const tablaAmortizacion: AmortizacionItem[] = [];

    for (let i = 1; i <= plazoMeses; i++) {
      const interesMensual = saldoPendiente * tasaInteresMensual;
      const amortizacionMensual = cuota - interesMensual;

      tablaAmortizacion.push({
        periodo: i,
        cuota: cuota.toFixed(2),
        interes: interesMensual.toFixed(2),
        amortizacion: amortizacionMensual.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
      });

      saldoPendiente -= amortizacionMensual;
    }

    setResultado({
      cuotaMensual: cuota.toFixed(2),
      totalIntereses: totalIntereses.toFixed(2),
      totalPagado: totalPagado.toFixed(2),
      tablaAmortizacion,
    });

    setMostrarResultados(true);
  };

  const data = {
    labels: Array.from(
      { length: parseFloat(formData.plazo) },
      (_, i) => `Año ${i + 1}`
    ),
    datasets: [
      {
        label: "Saldo pendiente del préstamo",
        data:
          resultado?.tablaAmortizacion
            .filter((_, i) => i % 12 === 0)
            .map((item) => parseFloat(item.saldoPendiente)) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora Hipotecaria</h1>
      <p className={styles.description}>
        Calcula la cuota mensual de tu préstamo hipotecario y visualiza cómo
        evoluciona tu deuda a lo largo del tiempo.
      </p>

      {/* Nuevo contenido textual */}
      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>¿Qué es una hipoteca?</h2>
        <p className={styles.text}>
          Una hipoteca es un préstamo a largo plazo que se utiliza para
          financiar la compra de una vivienda. El préstamo está garantizado por
          la propiedad, lo que significa que, si no se realizan los pagos, el
          prestamista puede tomar posesión de la propiedad.
        </p>
        <h2 className={styles.subtitle}>¿Cómo funciona esta calculadora?</h2>
        <p className={styles.text}>
          Esta calculadora te permite estimar la cuota mensual de tu hipoteca,
          los intereses totales que pagarás y el saldo pendiente a lo largo del
          tiempo. Simplemente ingresa el capital, el plazo y el tipo de interés,
          y obtén una proyección detallada.
        </p>
        <h2 className={styles.subtitle}>Consejos para gestionar tu hipoteca</h2>
        <ul className={styles.list}>
          <li>
            <strong>Compara ofertas:</strong> Revisa diferentes opciones de
            préstamos hipotecarios para encontrar la mejor tasa de interés.
          </li>
          <li>
            <strong>Amortiza anticipadamente:</strong> Si es posible, realiza
            pagos adicionales para reducir el capital y los intereses.
          </li>
          <li>
            <strong>Planifica tu presupuesto:</strong> Asegúrate de que la cuota
            mensual se ajuste a tus ingresos y gastos.
          </li>
          <li>
            <strong>Consulta a un experto:</strong> Si tienes dudas, busca
            asesoría financiera para tomar decisiones informadas.
          </li>
        </ul>
      </div>

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

          {error && <p className={styles.errorText}>{error}</p>}

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
        <div className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados del Cálculo</h2>
          <p className={styles.resultText}>
            Cuota mensual estimada: <span>{resultado?.cuotaMensual} €</span>
          </p>
          <p className={styles.resultText}>
            Total intereses pagados: <span>{resultado?.totalIntereses} €</span>
          </p>
          <p className={styles.resultText}>
            Total a pagar al finalizar el préstamo:{" "}
            <span>{resultado?.totalPagado} €</span>
          </p>

          <div className={styles.graphContainer}>
            <Line data={data} options={{ responsive: true }} />
          </div>

          <button
            onClick={() => setMostrarTabla(!mostrarTabla)}
            className={`${styles.button} ${styles.secondary}`}
          >
            {mostrarTabla
              ? "Ocultar Tabla de Amortización"
              : "Mostrar Tabla de Amortización"}
          </button>

          {mostrarTabla && resultado?.tablaAmortizacion && (
            <div className={styles.tableWrapper}>
              <h3>Tabla de Amortización</h3>
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
                  {resultado.tablaAmortizacion.map((fila) => (
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
          )}

          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({ capital: "", plazo: "", interes: "" });
              setResultado(null);
              setMostrarTabla(false);
            }}
            className={`${styles.button} ${styles.secondary}`}
          >
            Volver a empezar
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculadoraHipotecaria;
