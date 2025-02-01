import React, { useState, useEffect } from "react";
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

type FormDataKeys = "capital" | "tasaInteres" | "periodo";

const CalculadoraRentaInmediata: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    capital: "",
    tasaInteres: "",
    periodo: "",
  });
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [rentaMensual, setRentaMensual] = useState<string>("");
  const [graficoData, setGraficoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pasoActual, setPasoActual] = useState(0);

  const preguntas: {
    label: string;
    name: FormDataKeys;
    placeholder: string;
    descripcion?: string;
  }[] = [
    {
      label: "¿Cuál es el capital inicial que deseas invertir (€)?",
      name: "capital",
      placeholder: "Ej: 100000",
      descripcion:
        "Define el monto inicial que invertirás en la renta inmediata.",
    },
    {
      label: "¿Cuál es la tasa de interés anual esperada (%)?",
      name: "tasaInteres",
      placeholder: "Ej: 5",
      descripcion: "Indica la tasa de interés que esperas obtener.",
    },
    {
      label: "¿En cuántos meses deseas recibir la renta?",
      name: "periodo",
      placeholder: "Ej: 12",
      descripcion: "Especifica el plazo en meses para recibir la renta.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
  };

  const calcularRentaMensual = (
    capital: number,
    tasaInteres: number,
    periodo: number
  ): number => {
    return (capital * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -periodo));
  };

  const avanzarPaso = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularRentaInmediata();
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const calcularRentaInmediata = () => {
    const { capital, tasaInteres, periodo } = formData;
    if (!capital || !tasaInteres || !periodo) {
      alert("Por favor, completa todos los campos.");
    } else {
      setIsLoading(true);
      setMostrarResultados(true);
    }
  };

  useEffect(() => {
    if (mostrarResultados) {
      const capitalFloat = parseFloat(formData.capital);
      const tasaInteresFloat = parseFloat(formData.tasaInteres) / 100 / 12;
      const periodoFloat = parseFloat(formData.periodo);

      if (
        !isNaN(capitalFloat) &&
        !isNaN(tasaInteresFloat) &&
        !isNaN(periodoFloat)
      ) {
        const renta = calcularRentaMensual(
          capitalFloat,
          tasaInteresFloat,
          periodoFloat
        );
        setRentaMensual(renta.toFixed(2));

        const labels = Array.from({ length: periodoFloat }, (_, i) =>
          (i + 1).toString()
        );
        const data = {
          labels,
          datasets: [
            {
              label: "Renta Mensual",
              data: labels.map(() => renta.toFixed(2)),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2,
            },
          ],
        };
        setGraficoData(data);
      }

      setIsLoading(false);
    }
  }, [mostrarResultados, formData]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Renta Inmediata</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular los pagos periódicos que
        recibirías al invertir un capital inicial en una renta inmediata.
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
        <div className={styles.resultContainer}>
          <h2 className={styles.subtitle}>Resultados</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <p className={styles.resultText}>
                Capital Inicial: {formData.capital} €
              </p>
              <p className={styles.resultText}>
                Tasa de Interés: {formData.tasaInteres} %
              </p>
              <p className={styles.resultText}>
                Período: {formData.periodo} meses
              </p>
              <p className={styles.resultText}>
                Renta Mensual: {rentaMensual} €
              </p>

              {graficoData && (
                <div className={styles.chartContainer}>
                  <Line
                    data={graficoData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              )}

              <button
                className={styles.button}
                onClick={() => {
                  setMostrarResultados(false);
                  setPasoActual(0);
                  setFormData({
                    capital: "",
                    tasaInteres: "",
                    periodo: "",
                  });
                }}
              >
                Volver a Calcular
              </button>
            </>
          )}
        </div>
      )}

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación. Los resultados reales
        pueden variar dependiendo de las condiciones específicas del producto de
        renta inmediata.
      </p>
    </div>
  );
};

export default CalculadoraRentaInmediata;
