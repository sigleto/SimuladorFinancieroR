import React, { useState } from "react";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

interface AmortizacionItem {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

type FormDataKeys = "capital" | "plazo" | "interes" | "carencia";

const CalculadoraCarencia: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    capital: "",
    plazo: "",
    interes: "",
    carencia: "",
  });

  const [resultado, setResultado] = useState<{
    cuotaConCarencia: string;
    cuotaSinCarencia: string;
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
      descripcion: "Introduce el importe total del préstamo.",
    },
    {
      label: "¿Cuál es el plazo total del préstamo (años)?",
      name: "plazo" as FormDataKeys,
      placeholder: "Ej: 30",
      descripcion: "Indica el plazo total del préstamo en años.",
    },
    {
      label: "¿Cuál es el tipo de interés anual (%)?",
      name: "interes" as FormDataKeys,
      placeholder: "Ej: 2.5",
      descripcion: "Introduce el tipo de interés anual aplicado al préstamo.",
    },
    {
      label: "¿Cuál es el período de carencia (años)?",
      name: "carencia" as FormDataKeys,
      placeholder: "Ej: 2",
      descripcion:
        "Especifica la duración del período de carencia en años (durante este tiempo solo pagarás intereses).",
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
    const carenciaMeses = parseInt(formData.carencia || "0") * 12;

    // Cuota durante el período de carencia (solo intereses)
    const cuotaConCarencia = capitalInicial * tasaInteresMensual;

    // Cuota después del período de carencia
    const plazoRestanteMeses = plazoMeses - carenciaMeses;
    const cuotaSinCarencia =
      (capitalInicial *
        tasaInteresMensual *
        Math.pow(1 + tasaInteresMensual, plazoRestanteMeses)) /
      (Math.pow(1 + tasaInteresMensual, plazoRestanteMeses) - 1);

    // Calcular tabla de amortización
    let saldoPendiente = capitalInicial;
    const tablaAmortizacion: AmortizacionItem[] = [];

    for (let i = 1; i <= plazoMeses; i++) {
      let interesMensual = saldoPendiente * tasaInteresMensual;
      let amortizacionMensual =
        i > carenciaMeses ? cuotaSinCarencia - interesMensual : 0;

      tablaAmortizacion.push({
        periodo: i,
        cuota:
          i > carenciaMeses
            ? cuotaSinCarencia.toFixed(2)
            : cuotaConCarencia.toFixed(2),
        interes: interesMensual.toFixed(2),
        amortizacion: amortizacionMensual.toFixed(2),
        saldoPendiente: saldoPendiente.toFixed(2),
      });

      saldoPendiente -= amortizacionMensual;
    }

    // Calcular totales
    const totalPagado = tablaAmortizacion.reduce(
      (acc, item) => acc + parseFloat(item.cuota),
      0
    );
    const totalIntereses = totalPagado - parseFloat(formData.capital || "0");

    setResultado({
      cuotaConCarencia: cuotaConCarencia.toFixed(2),
      cuotaSinCarencia: cuotaSinCarencia.toFixed(2),
      totalIntereses: totalIntereses.toFixed(2),
      totalPagado: totalPagado.toFixed(2),
      tablaAmortizacion,
    });

    setMostrarResultados(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cálculo con Período de Carencia</h1>

      {!mostrarResultados ? (
        <>
          <p className={styles.description}>
            Calcula la cuota mensual incluyendo un período de carencia.
          </p>
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
        </>
      ) : (
        <>
          <h2 className={styles.title}>Resultados del Cálculo</h2>
          <div className={styles.resultContainer}>
            <p className={styles.resultText}>
              Cuota durante la carencia (solo intereses):{" "}
              {resultado?.cuotaConCarencia} €
            </p>
            <p className={styles.resultText}>
              Cuota después de la carencia (amortización e intereses):{" "}
              {resultado?.cuotaSinCarencia} €
            </p>
            <p className={styles.resultText}>
              Total intereses pagados al final del préstamo:{" "}
              {resultado?.totalIntereses} €
            </p>
            <p className={styles.resultText}>
              Total pagado al finalizar el préstamo: {resultado?.totalPagado} €
            </p>
          </div>

          <button
            onClick={() => setMostrarTabla(!mostrarTabla)}
            className={`${styles.button} ${styles.secondary}`}
          >
            {mostrarTabla ? "Ocultar Tabla de Amortización" : "Mostrar Tabla"}
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
              setFormData({
                capital: "",
                plazo: "",
                interes: "",
                carencia: "",
              });
              setResultado(null);
              setMostrarTabla(false);
            }}
            className={`${styles.button} ${styles.secondary}`}
          >
            Volver a empezar
          </button>
        </>
      )}
    </div>
  );
};

export default CalculadoraCarencia;
