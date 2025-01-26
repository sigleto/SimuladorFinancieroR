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

const CalculadoraJubilacion: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calcularJubilacion = () => {
    const { edadActual, edadJubilacion, montoActual, tasaInteres } = formData;
    if (!edadActual || !edadJubilacion || !montoActual || !tasaInteres) {
      setResultado({
        montoFinal: null,
        errorMensaje: "Por favor, complete todos los campos.",
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

  const volver = () => {
    setMostrarResultados(false);
  };

  const data = {
    labels: ["Monto Actual", "Monto al Jubilación"],
    datasets: [
      {
        label: "Crecimiento del Monto",
        data: resultado.montoFinal
          ? [parseFloat(formData.montoActual), resultado.montoFinal]
          : [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Calculadora de Jubilación</title>
        <meta
          name="description"
          content="Calcula cuánto dinero tendrás ahorrado para tu jubilación con esta herramienta profesional."
        />
      </Head>

      <div
        className={styles.container}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1 className={styles.title}>Calculadora de Jubilación</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!mostrarResultados ? (
            <div
              className={styles.form}
              style={{ width: "100%", maxWidth: "800px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={styles.formGroup}
                  style={{ width: "48%", marginBottom: "20px" }}
                >
                  <label htmlFor="edadActual" className={styles.label}>
                    Edad Actual:
                  </label>
                  <input
                    type="number"
                    id="edadActual"
                    name="edadActual"
                    value={formData.edadActual}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Ej: 30"
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className={styles.formGroup}
                  style={{ width: "48%", marginBottom: "20px" }}
                >
                  <label htmlFor="edadJubilacion" className={styles.label}>
                    Edad de Jubilación:
                  </label>
                  <input
                    type="number"
                    id="edadJubilacion"
                    name="edadJubilacion"
                    value={formData.edadJubilacion}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Ej: 65"
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className={styles.formGroup}
                  style={{ width: "48%", marginBottom: "20px" }}
                >
                  <label htmlFor="montoActual" className={styles.label}>
                    Monto Actual Ahorrado:
                  </label>
                  <input
                    type="number"
                    id="montoActual"
                    name="montoActual"
                    value={formData.montoActual}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Ej: 10000"
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className={styles.formGroup}
                  style={{ width: "48%", marginBottom: "20px" }}
                >
                  <label htmlFor="tasaInteres" className={styles.label}>
                    Tasa de Interés Anual (%):
                  </label>
                  <input
                    type="number"
                    id="tasaInteres"
                    name="tasaInteres"
                    value={formData.tasaInteres}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Ej: 5"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              {resultado.errorMensaje && (
                <p className={styles.error}>{resultado.errorMensaje}</p>
              )}
              <button
                onClick={calcularJubilacion}
                className={styles.button}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                }}
              >
                Calcular
              </button>
            </div>
          ) : (
            <div
              className={styles.resultados}
              style={{ width: "100%", maxWidth: "800px" }}
            >
              <h2 className={styles.enunciado}>Resultado</h2>
              <p className={styles.resultText}>
                Monto proyectado:{" "}
                <span>${resultado.montoFinal?.toLocaleString()}</span>
              </p>
              <div
                className={styles.graphContainer}
                style={{ width: "100%", height: "400px" }}
              >
                <Line
                  data={data}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
              <button
                onClick={volver}
                className={styles.toggleButton}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                }}
              >
                Volver
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CalculadoraJubilacion;
