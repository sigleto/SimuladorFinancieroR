import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Head from "next/head";
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
  | "edadActual"
  | "edadJubilacion"
  | "montoActual"
  | "tasaInteres";

const CalculadoraJubilacionInteractiva: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    edadActual: "",
    edadJubilacion: "",
    montoActual: "",
    tasaInteres: "",
  });

  const [resultado, setResultado] = useState<{
    montoFinal: number | null;
    errorMensaje: string;
  }>({ montoFinal: null, errorMensaje: "" });

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);

  const preguntas: {
    label: string;
    name: FormDataKeys;
    placeholder: string;
    descripcion?: string;
  }[] = [
    {
      label: "¿Cuál es tu edad actual?",
      name: "edadActual",
      placeholder: "Ej: 30",
      descripcion:
        "Ingresa tu edad actual para comenzar a planificar tu jubilación.",
    },
    {
      label: "¿A qué edad planeas jubilarte?",
      name: "edadJubilacion",
      placeholder: "Ej: 65",
      descripcion:
        "Define la edad a la que deseas jubilarte para calcular tu ahorro necesario.",
    },
    {
      label: "¿Cuánto dinero tienes ahorrado actualmente?",
      name: "montoActual",
      placeholder: "Ej: 10000",
      descripcion: "Indica cuánto has ahorrado hasta ahora para tu jubilación.",
    },
    {
      label: "¿Cuál es la tasa de interés anual esperada (%)?",
      name: "tasaInteres",
      placeholder: "Ej: 5",
      descripcion:
        "Proporciona la tasa de interés anual que esperas obtener sobre tus ahorros.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
  };

  const calcularJubilacion = () => {
    const { edadActual, edadJubilacion, montoActual, tasaInteres } = formData;

    if (!edadActual || !edadJubilacion || !montoActual || !tasaInteres) {
      setResultado({
        montoFinal: null,
        errorMensaje: "Por favor, completa todos los campos.",
      });
      return;
    }

    const edad = parseInt(edadActual);
    const edadJub = parseInt(edadJubilacion);
    const monto = parseFloat(montoActual);
    const tasa = parseFloat(tasaInteres) / 100;

    if (edad >= edadJub) {
      setResultado({
        montoFinal: null,
        errorMensaje:
          "La edad actual debe ser menor que la edad de jubilación.",
      });
      return;
    }

    const años = edadJub - edad;
    const montoFinal = monto * Math.pow(1 + tasa, años);

    setResultado({
      montoFinal: parseFloat(montoFinal.toFixed(2)),
      errorMensaje: "",
    });
    setMostrarResultados(true);
  };

  const avanzarPaso = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularJubilacion();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const data = {
    labels: ["Monto Actual", "Monto al Jubilación"],
    datasets: [
      {
        label: "Crecimiento del Monto",
        data: resultado.montoFinal
          ? [parseFloat(formData.montoActual), resultado.montoFinal]
          : [],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Calculadora de Jubilación - Planifica tu Futuro</title>
        <meta
          name="description"
          content="Calcula cuánto dinero tendrás ahorrado para tu jubilación con nuestra herramienta profesional. Planifica tu futuro financiero de manera sencilla y efectiva."
        />
        <meta
          name="keywords"
          content="calculadora jubilación, ahorro jubilación, planificación financiera, tasa de interés, ahorro futuro"
        />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Calculadora de Jubilación</h1>
        <p className={styles.description}>
          Planifica tu futuro financiero con nuestra calculadora de jubilación.
          Descubre cuánto podrás ahorrar para disfrutar de una jubilación
          tranquila.
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
            {resultado.errorMensaje && (
              <p className={styles.error}>{resultado.errorMensaje}</p>
            )}
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
            <h2 className={styles.enunciado}>Resultado</h2>
            <p className={styles.resultText}>
              Monto proyectado para tu jubilación:
              <span> ${resultado.montoFinal?.toLocaleString()}</span>
            </p>
            <div className={styles.graphContainer}>
              <Line data={data} options={{ responsive: true }} />
            </div>
            <button
              onClick={() => {
                setMostrarResultados(false);
                setPasoActual(0);
                setFormData({
                  edadActual: "",
                  edadJubilacion: "",
                  montoActual: "",
                  tasaInteres: "",
                });
              }}
              className={`${styles.button} ${styles.secondary}`}
            >
              Volver a empezar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculadoraJubilacionInteractiva;
