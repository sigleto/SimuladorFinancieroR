import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../Estilos/EstiloCalculadoras.module.css";

const CalculadoraRentaInmediata: React.FC = () => {
  const router = useRouter();
  const [capital, setCapital] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [error, setError] = useState("");

  const validarEntradas = () => {
    if (!capital || !tasaInteres || !periodo) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    if (
      isNaN(Number(capital)) ||
      isNaN(Number(tasaInteres)) ||
      isNaN(Number(periodo))
    ) {
      setError("Por favor, ingrese valores numéricos válidos.");
      return false;
    }
    if (
      Number(capital) <= 0 ||
      Number(tasaInteres) <= 0 ||
      Number(periodo) <= 0
    ) {
      setError("Por favor, ingrese valores positivos.");
      return false;
    }
    setError("");
    return true;
  };

  const calcularRentaInmediata = () => {
    if (!validarEntradas()) return;

    router.push({
      pathname: "/ResultadoInmediatas",
      query: { capital, tasaInteres, periodo },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Renta Inmediata</h1>
      <p className={styles.description}>
        Calcula la renta inmediata basada en el capital inicial, la tasa de
        interés y el período de pago. Ingresa los valores para obtener
        resultados precisos.
      </p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Capital Inicial (€)</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Ej: 100000"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tasa de Interés Anual (%)</label>
          <input
            type="number"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
            placeholder="Ej: 5"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Período de Pago (meses)</label>
          <input
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            placeholder="Ej: 120"
            className={styles.input}
          />
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.contButton}>
          <button
            onClick={calcularRentaInmediata}
            className={`${styles.button} ${styles.primary}`}
          >
            Calcular Renta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRentaInmediata;
