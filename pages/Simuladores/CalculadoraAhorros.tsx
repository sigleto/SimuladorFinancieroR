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

type FormDataKeys = "meta" | "tasaInteres" | "periodo" | "tipoInteres";

const CalculadoraAhorrosInteractiva: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    meta: "",
    tasaInteres: "",
    periodo: "",
    tipoInteres: "anual",
  });

  const [ahorroNecesario, setAhorroNecesario] = useState<number | null>(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);

  const preguntas: {
    label: string;
    name: FormDataKeys;
    placeholder: string;
    descripcion?: string;
  }[] = [
    {
      label: "¿Cuál es tu meta de ahorro (€)?",
      name: "meta",
      placeholder: "Ej: 10000",
      descripcion: "Define la cantidad total que deseas ahorrar.",
    },
    {
      label: "¿Cuál es la tasa de interés anual esperada (%)?",
      name: "tasaInteres",
      placeholder: "Ej: 5",
      descripcion: "Indica la tasa de interés que esperas obtener.",
    },
    {
      label: "¿En cuántos años deseas alcanzar tu meta?",
      name: "periodo",
      placeholder: "Ej: 5",
      descripcion: "Especifica el plazo en años para alcanzar tu meta.",
    },
    {
      label: "¿El interés es anual o mensual?",
      name: "tipoInteres",
      placeholder: "",
      descripcion: "Selecciona el tipo de interés aplicado.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
  };

  const calcularAhorro = () => {
    const { meta, tasaInteres, periodo, tipoInteres } = formData;
    const metaFloat = parseFloat(meta);
    const tasaInteresFloat = parseFloat(tasaInteres) / 100;
    const periodoFloat = parseFloat(periodo);

    const tasaInteresMensual =
      tipoInteres === "anual"
        ? Math.pow(1 + tasaInteresFloat, 1 / 12) - 1
        : tasaInteresFloat;
    const ahorroNecesarioCalculado =
      metaFloat /
      ((Math.pow(1 + tasaInteresMensual, periodoFloat * 12) - 1) /
        tasaInteresMensual);

    setAhorroNecesario(
      isNaN(ahorroNecesarioCalculado) ? 0 : ahorroNecesarioCalculado
    );
    setMostrarResultados(true);
  };

  const avanzarPaso = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularAhorro();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const data = {
    labels: Array.from(
      { length: parseFloat(formData.periodo) },
      (_, i) => `Año ${i + 1}`
    ),
    datasets: [
      {
        label: "Progreso del ahorro acumulado",
        data: Array.from(
          { length: parseFloat(formData.periodo) },
          (_, i) => (ahorroNecesario || 0) * 12 * (i + 1)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Ahorros</h1>
      <p className={styles.description}>
        Planifica tus metas financieras calculando cuánto necesitas ahorrar, el
        impacto de la tasa de interés y el tiempo requerido para alcanzar tus
        objetivos.
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
            {preguntas[pasoActual].name === "tipoInteres" ? (
              <select
                name={preguntas[pasoActual].name}
                value={formData[preguntas[pasoActual].name]}
                onChange={handleInputChange}
                className={styles.input}
              >
                <option value="anual">Anual</option>
                <option value="mensual">Mensual</option>
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
        <div className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultado</h2>
          <p className={styles.resultText}>
            Ahorro mensual necesario:{" "}
            <span>{ahorroNecesario?.toFixed(2)} €</span>
          </p>
          <div className={styles.graphContainer}>
            <Line data={data} options={{ responsive: true }} />
          </div>
          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({
                meta: "",
                tasaInteres: "",
                periodo: "",
                tipoInteres: "anual",
              });
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

export default CalculadoraAhorrosInteractiva;
