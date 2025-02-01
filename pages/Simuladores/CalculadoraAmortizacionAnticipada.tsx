import React, { useState } from "react";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

type FormDataKeys =
  | "capitalPendiente"
  | "plazoRestante"
  | "interes"
  | "amortizacionAnticipada";

interface ResultadoReduccionCuota {
  nuevaCuota: string;
  reduccionCuota: string;
  ahorroTotal: string;
  tabla: TablaData[];
}

interface ResultadoReduccionPlazo {
  nuevoPlazoCuotas: number;
  reduccionPlazo: number;
  ultimaCuota: string;
  ahorroTotal: string;
  tabla: TablaData[];
}

interface TablaData {
  periodo: number;
  cuota: string;
  interes: string;
  amortizacion: string;
  saldoPendiente: string;
}

const CalculadoraAmortAnticipadaInteractiva: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormDataKeys, string>>({
    capitalPendiente: "",
    plazoRestante: "",
    interes: "",
    amortizacionAnticipada: "",
  });

  const [error, setError] = useState<string>("");
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarTablaCuota, setMostrarTablaCuota] = useState(false);
  const [mostrarTablaPlazo, setMostrarTablaPlazo] = useState(false);

  const [resultadoReduccionCuota, setResultadoReduccionCuota] =
    useState<ResultadoReduccionCuota | null>(null);
  const [resultadoReduccionPlazo, setResultadoReduccionPlazo] =
    useState<ResultadoReduccionPlazo | null>(null);

  const preguntas = [
    {
      label: "¿Cuál es el capital pendiente (€)?",
      name: "capitalPendiente" as FormDataKeys,
      placeholder: "Ej: 100000",
      descripcion: "Introduce el importe pendiente de tu préstamo.",
    },
    {
      label: "¿Cuántos meses quedan de plazo?",
      name: "plazoRestante" as FormDataKeys,
      placeholder: "Ej: 120",
      descripcion: "Indica el plazo restante en meses.",
    },
    {
      label: "¿Cuál es el tipo de interés anual (%)?",
      name: "interes" as FormDataKeys,
      placeholder: "Ej: 2.5",
      descripcion: "Introduce el interés anual del préstamo.",
    },
    {
      label: "¿Cuánto deseas amortizar anticipadamente (€)?",
      name: "amortizacionAnticipada" as FormDataKeys,
      placeholder: "Ej: 20000",
      descripcion:
        "Especifica el importe que deseas amortizar de forma anticipada.",
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
      setMostrarResultados(true);
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const calcularResultados = () => {
    const capital = parseFloat(formData.capitalPendiente);
    const plazo = parseInt(formData.plazoRestante);
    const tasaInteres = parseFloat(formData.interes) / 100 / 12;
    const amortizacion = parseFloat(formData.amortizacionAnticipada);

    // Cálculo para reducción de cuota
    const nuevoCapital = capital - amortizacion;
    const nuevaCuota =
      (nuevoCapital * tasaInteres * Math.pow(1 + tasaInteres, plazo)) /
      (Math.pow(1 + tasaInteres, plazo) - 1);
    const cuotaOriginal =
      (capital * tasaInteres * Math.pow(1 + tasaInteres, plazo)) /
      (Math.pow(1 + tasaInteres, plazo) - 1);

    let saldoReduccionCuota = nuevoCapital;
    const tablaReduccionCuota: TablaData[] = [];
    for (let i = 0; i < plazo; i++) {
      const interesMensual = saldoReduccionCuota * tasaInteres;
      const capitalMensual = nuevaCuota - interesMensual;
      saldoReduccionCuota -= capitalMensual;

      tablaReduccionCuota.push({
        periodo: i + 1,
        cuota: nuevaCuota.toFixed(2),
        interes: interesMensual.toFixed(2),
        amortizacion: capitalMensual.toFixed(2),
        saldoPendiente:
          saldoReduccionCuota > 0 ? saldoReduccionCuota.toFixed(2) : "0.00",
      });
    }

    setResultadoReduccionCuota({
      nuevaCuota: nuevaCuota.toFixed(2),
      reduccionCuota: (cuotaOriginal - nuevaCuota).toFixed(2),
      ahorroTotal: (cuotaOriginal * plazo - nuevaCuota * plazo).toFixed(2),
      tabla: tablaReduccionCuota,
    });

    // Cálculo para reducción de plazo
    let nuevoPlazoParcial =
      Math.log(cuotaOriginal / (cuotaOriginal - nuevoCapital * tasaInteres)) /
      Math.log(1 + tasaInteres);
    let nuevoPlazoCuotas = Math.floor(nuevoPlazoParcial);
    let saldoReduccionPlazo = capital;
    const tablaReduccionPlazo: TablaData[] = [];
    for (let i = 0; i < nuevoPlazoCuotas; i++) {
      const interesMensual = saldoReduccionPlazo * tasaInteres;
      const capitalMensual = cuotaOriginal - interesMensual;
      saldoReduccionPlazo -= capitalMensual;

      tablaReduccionPlazo.push({
        periodo: i + 1,
        cuota: cuotaOriginal.toFixed(2),
        interes: interesMensual.toFixed(2),
        amortizacion: capitalMensual.toFixed(2),
        saldoPendiente:
          saldoReduccionPlazo > 0 ? saldoReduccionPlazo.toFixed(2) : "0.00",
      });
    }

    setResultadoReduccionPlazo({
      nuevoPlazoCuotas,
      reduccionPlazo: plazo - nuevoPlazoCuotas,
      ultimaCuota: saldoReduccionPlazo.toFixed(2),
      ahorroTotal: (
        cuotaOriginal * plazo -
        cuotaOriginal * nuevoPlazoCuotas -
        saldoReduccionPlazo
      ).toFixed(2),
      tabla: tablaReduccionPlazo,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Amortización Anticipada</h1>
      {!mostrarResultados ? (
        <div className={styles.form}>
          <label className={styles.label}>{preguntas[pasoActual].label}</label>
          <p className={styles.inputDescription}>
            {preguntas[pasoActual].descripcion}
          </p>
          <input
            type="number"
            name={preguntas[pasoActual].name}
            value={formData[preguntas[pasoActual].name]}
            onChange={handleInputChange}
            placeholder={preguntas[pasoActual].placeholder}
            className={styles.input}
          />
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
        <div>
          <h2>Resultados:</h2>

          {/* Resultados de reducción de cuota */}
          <h3>Reducción de Cuota:</h3>
          <p className={styles.resultText}>
            Nueva cuota mensual: {resultadoReduccionCuota?.nuevaCuota} €
          </p>
          <p className={styles.resultText}>
            Reducción de cuota mensual:{" "}
            {resultadoReduccionCuota?.reduccionCuota} €
          </p>
          <p className={styles.resultText}>
            Ahorro total estimado en intereses:{" "}
            {resultadoReduccionCuota?.ahorroTotal} €
          </p>
          <button
            onClick={() => setMostrarTablaCuota(!mostrarTablaCuota)}
            className={`${styles.button} ${styles.secondary}`}
          >
            {mostrarTablaCuota
              ? "Ocultar Tabla de Cuota"
              : "Ver Tabla de Cuota"}
          </button>
          {mostrarTablaCuota && resultadoReduccionCuota?.tabla && (
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
                  {resultadoReduccionCuota.tabla.map((fila) => (
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

          {/* Resultados de reducción de plazo */}
          <h3>Reducción de Plazo:</h3>
          <p className={styles.resultText}>
            Nuevo plazo en meses: {resultadoReduccionPlazo?.nuevoPlazoCuotas}
          </p>
          <p className={styles.resultText}>
            Última cuota estimada: {resultadoReduccionPlazo?.ultimaCuota} €
          </p>
          <p className={styles.resultText}>
            Ahorro total estimado en intereses:{" "}
            {resultadoReduccionPlazo?.ahorroTotal} €
          </p>
          <button
            onClick={() => setMostrarTablaPlazo(!mostrarTablaPlazo)}
            className={`${styles.button} ${styles.secondary}`}
          >
            {mostrarTablaPlazo
              ? "Ocultar Tabla de Plazo"
              : "Ver Tabla de Plazo"}
          </button>
          {mostrarTablaPlazo && resultadoReduccionPlazo?.tabla && (
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
                  {resultadoReduccionPlazo.tabla.map((fila) => (
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

          {/* Botón para reiniciar */}
          <button
            onClick={() => {
              setMostrarResultados(false);
              setPasoActual(0);
              setFormData({
                capitalPendiente: "",
                plazoRestante: "",
                interes: "",
                amortizacionAnticipada: "",
              });
              setResultadoReduccionCuota(null);
              setResultadoReduccionPlazo(null);
              setMostrarTablaCuota(false);
              setMostrarTablaPlazo(false);
            }}
            className={`${styles.button} ${styles.primary}`}
          >
            Volver a empezar
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculadoraAmortAnticipadaInteractiva;
