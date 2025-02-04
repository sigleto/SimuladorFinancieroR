import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../Estilos/EstiloDiasJubilacion.module.css";

interface RetirementAge {
  years: string;
  months: string;
}

interface TimeRemaining {
  years: number | null;
  months: number | null;
  days: number | null;
}

interface ValidationError {
  message: string;
}

const DiasJubilacion: React.FC = () => {
  const router = useRouter();

  const [birthDate, setBirthDate] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<RetirementAge>({
    years: "",
    months: "",
  });
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: null,
    months: null,
    days: null,
  });
  const [error, setError] = useState<ValidationError | null>(null);

  const isValidDate = (dateString: string): boolean => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  const calculateTimeRemaining = () => {
    setError(null);

    if (!birthDate || !isValidDate(birthDate)) {
      setError({
        message: "Ingrese una fecha de nacimiento válida (DD-MM-YYYY)",
      });
      return;
    }

    if (!retirementAge.years && !retirementAge.months) {
      setError({ message: "Ingrese la edad de jubilación" });
      return;
    }

    const currentDate = new Date();
    const [day, month, year] = birthDate
      .split("-")
      .map((part) => parseInt(part, 10));
    const birthDateObj = new Date(year, month - 1, day);

    const retirementYears = parseInt(retirementAge.years, 10) || 0;
    const retirementMonths = parseInt(retirementAge.months, 10) || 0;

    if (retirementYears < 18 || retirementYears > 100) {
      setError({
        message: "Edad de jubilación debe estar entre 18 y 100 años",
      });
      return;
    }

    const retirementDate = new Date(
      birthDateObj.getFullYear() + retirementYears,
      birthDateObj.getMonth() + retirementMonths,
      birthDateObj.getDate()
    );

    if (retirementDate <= currentDate) {
      setError({ message: "La fecha de jubilación debe ser en el futuro" });
      return;
    }

    const differenceInMillis = retirementDate.getTime() - currentDate.getTime();
    const years = Math.floor(
      differenceInMillis / (1000 * 60 * 60 * 24 * 365.25)
    );
    const months = Math.floor(
      (differenceInMillis % (1000 * 60 * 60 * 24 * 365.25)) /
        (1000 * 60 * 60 * 24 * 30.44)
    );
    const days = Math.floor(
      (differenceInMillis % (1000 * 60 * 60 * 24 * 30.44)) /
        (1000 * 60 * 60 * 24)
    );

    setTimeRemaining({ years, months, days });
  };

  const handleDateInputChange = (text: string) => {
    const numericText = text.replace(/\D/g, "");
    const limitedText = numericText.slice(0, 8);

    let formattedText = "";
    if (limitedText.length > 0) {
      formattedText += limitedText.slice(0, 2);
      if (limitedText.length > 2) {
        formattedText += "-" + limitedText.slice(2, 4);
        if (limitedText.length > 4) {
          formattedText += "-" + limitedText.slice(4, 8);
        }
      }
    }

    setBirthDate(formattedText);
  };

  const volver = () => router.push("/");

  return (
    <>
      <Head>
        <title>Calculadora de Días hasta la Jubilación</title>
        <meta
          name="description"
          content="Calcula el tiempo exacto que te queda para jubilarte basado en tu fecha de nacimiento"
        />
        <meta
          name="keywords"
          content="jubilación, calculadora, tiempo restante, planificación financiera"
        />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>
          Calculadora de Días hasta la Jubilación
        </h1>
        <p className={styles.description}>
          Esta herramienta te permite conocer cuántos días, meses y años te
          faltan para jubilarte. Solo necesitas ingresar tu fecha de nacimiento
          y la edad a la que planeas jubilarte.
        </p>

        <div className={styles.contentSection}>
          <h2 className={styles.subtitle}>
            ¿Por qué planificar tu jubilación?
          </h2>
          <p className={styles.text}>
            Planificar tu jubilación es esencial para garantizar un futuro
            financiero estable. Saber cuánto tiempo te queda para jubilarte te
            ayudará a tomar decisiones informadas sobre ahorros, inversiones y
            gastos.
          </p>

          <h2 className={styles.subtitle}>¿Cómo funciona esta calculadora?</h2>
          <p className={styles.text}>
            Ingresa tu fecha de nacimiento en formato DD-MM-AAAA y la edad a la
            que deseas jubilarte (en años y meses). La calculadora te mostrará
            el tiempo exacto que te queda para alcanzar tu jubilación.
          </p>

          <h2 className={styles.subtitle}>
            Consejos para una jubilación exitosa
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Ahorra temprano:</strong> Comienza a ahorrar para tu
              jubilación lo antes posible para aprovechar el interés compuesto.
            </li>
            <li>
              <strong>Diversifica tus inversiones:</strong> No dependas de una
              sola fuente de ingresos para tu jubilación.
            </li>
            <li>
              <strong>Consulta a un asesor financiero:</strong> Un profesional
              puede ayudarte a crear un plan de jubilación personalizado.
            </li>
          </ul>
        </div>

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error.message}</p>
          </div>
        )}

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Fecha de Nacimiento (DD-MM-YYYY):
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="DD-MM-YYYY"
            value={birthDate}
            onChange={(e) => handleDateInputChange(e.target.value)}
            maxLength={10}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Edad de Jubilación:</label>
          <div className={styles.ageInputContainer}>
            <input
              type="number"
              className={styles.ageInput}
              placeholder="Años"
              value={retirementAge.years}
              onChange={(e) =>
                setRetirementAge({
                  ...retirementAge,
                  years: e.target.value.slice(0, 3),
                })
              }
              min={18}
              max={100}
            />
            <input
              type="number"
              className={styles.ageInput}
              placeholder="Meses"
              value={retirementAge.months}
              onChange={(e) =>
                setRetirementAge({
                  ...retirementAge,
                  months: e.target.value.slice(0, 2),
                })
              }
              min={0}
              max={11}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={calculateTimeRemaining}>
            Calcular
          </button>
          <button className={styles.button} onClick={volver}>
            Volver
          </button>
        </div>

        {timeRemaining.years !== null && (
          <div className={styles.resultContainer}>
            <label className={styles.resultLabel}>
              Tiempo hasta la jubilación:
            </label>
            <p className={styles.resultText}>
              {timeRemaining.years > 0 && `${timeRemaining.years} años`}
              {(timeRemaining.months ?? 0) > 0 &&
                `, ${timeRemaining.months} meses`}
              {(timeRemaining.days ?? 0) > 0 && `, ${timeRemaining.days} días`}
            </p>
            <p className={styles.resultAdvice}>
              Considera este tiempo para planificar tu futuro financiero y
              asegurarte de tener una jubilación cómoda.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DiasJubilacion;
