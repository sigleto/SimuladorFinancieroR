import React, { useState, useRef } from "react";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

type FormFields = "capital" | "tasaInteres" | "periodo";

const preguntas = [
  {
    label: "Capital Inicial (€)",
    name: "capital" as FormFields,
    placeholder: "Ej: 100000",
    descripcion: "Ingrese el monto del capital inicial para la renta.",
  },
  {
    label: "Tasa de Interés Anual (%)",
    name: "tasaInteres" as FormFields,
    placeholder: "Ej: 5",
    descripcion: "Proporcione la tasa de interés anual esperada.",
  },
  {
    label: "Período de Pago (meses)",
    name: "periodo" as FormFields,
    placeholder: "Ej: 120",
    descripcion: "Indique la duración del período de pago en meses.",
  },
];

const CalculadoraRentaInmediata: React.FC = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [formData, setFormData] = useState<{
    capital: string;
    tasaInteres: string;
    periodo: string;
  }>({ capital: "", tasaInteres: "", periodo: "" });
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultado, setResultado] = useState<{
    rentaMensual: number;
    totalPagado: number;
  } | null>(null);
  const resultadoRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const avanzarPaso = () => {
    const currentField = preguntas[pasoActual].name;
    if (formData[currentField] === "") return;
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularRentaInmediata();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1);
  };

  const calcularRentaInmediata = () => {
    const capital = parseFloat(formData.capital);
    const tasaInteres = parseFloat(formData.tasaInteres) / 100 / 12;
    const periodo = parseInt(formData.periodo);

    if (
      isNaN(capital) ||
      isNaN(tasaInteres) ||
      isNaN(periodo) ||
      capital <= 0 ||
      tasaInteres <= 0 ||
      periodo <= 0
    )
      return;

    const rentaMensual =
      (capital * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -periodo));
    const totalPagado = rentaMensual * periodo;

    setResultado({ rentaMensual, totalPagado });
    setMostrarResultados(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Renta Inmediata</h1>
      <p className={styles.description}>
        Calcula la renta inmediata basada en el capital inicial, la tasa de
        interés y el período de pago.
      </p>

      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>¿Qué es la Renta Inmediata?</h2>
        <p className={styles.text}>
          La renta inmediata es un producto financiero que permite recibir pagos
          periódicos tras una inversión inicial. Es ideal para quienes buscan
          una fuente de ingresos constante durante un período determinado.
        </p>

        <h2 className={styles.subtitle}>¿Cómo funciona esta calculadora?</h2>
        <p className={styles.text}>
          Introduce el capital inicial, la tasa de interés anual y el período de
          pago en meses. La calculadora estimará la renta mensual que recibirás
          y el total pagado al finalizar el período.
        </p>

        <h2 className={styles.subtitle}>Consejos financieros</h2>
        <ul className={styles.list}>
          <li>
            <strong>Diversifica tus inversiones:</strong> No pongas todos tus
            fondos en un solo producto financiero.
          </li>
          <li>
            <strong>Consulta con expertos:</strong> Antes de tomar decisiones
            importantes, busca asesoría profesional.
          </li>
          <li>
            <strong>Evalúa riesgos:</strong> Considera los posibles riesgos y
            beneficios de la renta inmediata.
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
          <h2 className={styles.enunciado}>Resultados de la Renta Inmediata</h2>
          <p className={styles.resultText}>
            Renta Mensual: <span>{resultado?.rentaMensual.toFixed(2)} €</span>
          </p>
          <p className={styles.resultText}>
            Monto Total Pagado:{" "}
            <span>{resultado?.totalPagado.toFixed(2)} €</span>
          </p>
          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({ capital: "", tasaInteres: "", periodo: "" });
              setResultado(null);
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

export default CalculadoraRentaInmediata;
