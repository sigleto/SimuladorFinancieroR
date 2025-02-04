import React, { useState, useRef } from "react";
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

type FormDataKeys =
  | "principal"
  | "rate"
  | "time"
  | "contributions"
  | "tipoInteres"
  | "unidadPeriodo";

const CalculadoraInversionesUnificada: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    principal: "",
    rate: "",
    time: "",
    contributions: "0",
    tipoInteres: "anual",
    unidadPeriodo: "años",
  });

  const [result, setResult] = useState<string | null>(null);
  const [totalIntereses, setTotalIntereses] = useState<string>("");
  const [rendimientoAcumulado, setRendimientoAcumulado] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);

  const resultRef = useRef<HTMLDivElement>(null);

  const preguntas: {
    label: string;
    name: FormDataKeys;
    placeholder: string;
    descripcion?: string;
    type?: "select";
    options?: { value: string; label: string }[];
  }[] = [
    {
      label: "¿Cuál es tu capital inicial ($)?",
      name: "principal",
      placeholder: "Ej: 10000",
      descripcion: "Define la cantidad inicial que invertirás.",
    },
    {
      label: "¿Cuál es la tasa de interés anual esperada (%)?",
      name: "rate",
      placeholder: "Ej: 5",
      descripcion: "Indica la tasa de interés que esperas obtener.",
    },
    {
      label: "¿Cuánto tiempo deseas invertir?",
      name: "time",
      placeholder: "Ej: 5",
      descripcion: "Especifica el plazo en años o meses para tu inversión.",
    },
    {
      label: "¿En qué unidad de tiempo deseas invertir?",
      name: "unidadPeriodo",
      placeholder: "",
      descripcion: "Selecciona si el tiempo es en años o meses.",
      type: "select",
      options: [
        { value: "años", label: "Años" },
        { value: "meses", label: "Meses" },
      ],
    },
    {
      label: "¿Cuánto deseas contribuir anualmente (opcional) ($)?",
      name: "contributions",
      placeholder: "Ej: 1000",
      descripcion: "Define las contribuciones anuales adicionales.",
    },
    {
      label: "¿El interés es anual o mensual?",
      name: "tipoInteres",
      placeholder: "",
      descripcion: "Selecciona el tipo de interés aplicado.",
      type: "select",
      options: [
        { value: "anual", label: "Anual" },
        { value: "mensual", label: "Mensual" },
      ],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
  };

  const calcularInversion = () => {
    const { principal, rate, time, contributions, tipoInteres, unidadPeriodo } =
      formData;
    if (!principal || !rate || !time || !contributions) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    const principalAmount = parseFloat(principal);
    const ratePercentage = parseFloat(rate) / 100;
    const timePeriod = parseFloat(time);
    const annualContributions = parseFloat(contributions);

    let totalIntereses = 0;
    let totalPagado = principalAmount;
    let rendimientoAcumulado = 0;

    const dataPoints: number[] = [principalAmount];

    if (tipoInteres === "anual" && unidadPeriodo === "años") {
      for (let i = 0; i < timePeriod; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions + interest;
        dataPoints.push(totalPagado);
      }
    } else {
      const totalMonths =
        unidadPeriodo === "años" ? timePeriod * 12 : timePeriod;
      const monthlyRate = ratePercentage / 12;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * monthlyRate;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
        dataPoints.push(totalPagado);
      }
    }

    rendimientoAcumulado = totalPagado - principalAmount;
    setResult(totalPagado.toFixed(2));
    setTotalIntereses(totalIntereses.toFixed(2));
    setRendimientoAcumulado(rendimientoAcumulado.toFixed(2));
    setIsLoading(false);
    setMostrarResultados(true);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const avanzarPaso = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularInversion();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const data = {
    labels: Array.from(
      { length: parseFloat(formData.time) },
      (_, i) => `Año ${i + 1}`
    ),
    datasets: [
      {
        label: "Valor de la Inversión",
        data: Array.from(
          { length: parseFloat(formData.time) },
          (_, i) =>
            (parseFloat(result || "0") / parseFloat(formData.time)) * (i + 1)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Inversiones</h1>
      <p className={styles.description}>
        Utiliza esta calculadora para planificar tus inversiones a largo plazo.
        Ingresa tu capital inicial, tasa de interés, duración de la inversión y
        contribuciones anuales para obtener una proyección detallada de tu
        inversión.
      </p>

      {/* Nuevo contenido textual */}
      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>¿Por qué invertir?</h2>
        <p className={styles.text}>
          Invertir es una de las mejores formas de hacer crecer tu dinero a lo
          largo del tiempo. Ya sea que estés ahorrando para la jubilación, la
          educación de tus hijos o un objetivo financiero específico, una buena
          planificación puede marcar la diferencia.
        </p>
        <h2 className={styles.subtitle}>¿Cómo funciona esta calculadora?</h2>
        <p className={styles.text}>
          Esta calculadora te permite simular el crecimiento de tu inversión en
          función de tu capital inicial, la tasa de interés, el plazo y las
          contribuciones adicionales. Obtendrás una proyección detallada del
          valor futuro de tu inversión y los intereses acumulados.
        </p>
        <h2 className={styles.subtitle}>Consejos para invertir</h2>
        <ul className={styles.list}>
          <li>
            <strong>Diversifica tu cartera:</strong> No pongas todos tus huevos
            en la misma canasta. Invierte en diferentes activos para reducir el
            riesgo.
          </li>
          <li>
            <strong>Invierte a largo plazo:</strong> El tiempo es tu mejor
            aliado para aprovechar el interés compuesto.
          </li>
          <li>
            <strong>Revisa tus inversiones:</strong> Monitorea periódicamente el
            rendimiento de tus inversiones y ajusta tu estrategia si es
            necesario.
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
            {preguntas[pasoActual].type === "select" ? (
              <select
                name={preguntas[pasoActual].name}
                value={formData[preguntas[pasoActual].name]}
                onChange={handleInputChange}
                className={styles.input}
              >
                {preguntas[pasoActual].options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                name={preguntas[pasoActual].name}
                value={formData[preguntas[pasoActual].name]}
                onChange={handleInputChange}
                placeholder={preguntas[pasoActual].placeholder}
                className={styles.input}
              />
            )}
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
        <div ref={resultRef} className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados de la Inversión</h2>
          <p>
            <span className={styles.labelText}>Valor Futuro:</span>{" "}
            <span className={styles.resultText}>${result}</span>
          </p>
          <p>
            <span className={styles.labelText}>Rendimiento Acumulado:</span>{" "}
            <span className={styles.resultText}>${rendimientoAcumulado}</span>
          </p>
          <p>
            <span className={styles.labelText}>
              Total de Intereses Ganados:
            </span>{" "}
            <span className={styles.resultText}>${totalIntereses}</span>
          </p>

          <div className={styles.graphContainer}>
            <Line data={data} options={{ responsive: true }} />
          </div>

          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({
                principal: "",
                rate: "",
                time: "",
                contributions: "0",
                tipoInteres: "anual",
                unidadPeriodo: "años",
              });
            }}
            className={`${styles.button} ${styles.secondary}`}
          >
            Volver a empezar
          </button>
        </div>
      )}

      <p className={styles.disclaimer}>
        Esta calculadora es solo para fines informativos. Consulte a un asesor
        financiero para obtener consejos personalizados.
      </p>
    </div>
  );
};

export default CalculadoraInversionesUnificada;
