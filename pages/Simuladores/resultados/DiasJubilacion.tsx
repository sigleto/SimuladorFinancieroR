import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../../Estilos/EstiloDiasJubilacion.module.css';

// Interfaces con validaciones más estrictas
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

  // Estados con validaciones
  const [birthDate, setBirthDate] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<RetirementAge>({
    years: '',
    months: '',
  });
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: null,
    months: null,
    days: null,
  });
  const [error, setError] = useState<ValidationError | null>(null);

  // Función de validación de fecha
  const isValidDate = (dateString: string): boolean => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  // Cálculo de tiempo restante con validaciones
  const calculateTimeRemaining = () => {
    // Resetear errores
    setError(null);

    // Validaciones exhaustivas
    if (!birthDate || !isValidDate(birthDate)) {
      setError({ message: 'Ingrese una fecha de nacimiento válida (DD-MM-YYYY)' });
      return;
    }

    if (!retirementAge.years && !retirementAge.months) {
      setError({ message: 'Ingrese la edad de jubilación' });
      return;
    }

    const currentDate = new Date();
    const [day, month, year] = birthDate.split('-').map((part) => parseInt(part, 10));
    const birthDateObj = new Date(year, month - 1, day);

    const retirementYears = parseInt(retirementAge.years, 10) || 0;
    const retirementMonths = parseInt(retirementAge.months, 10) || 0;

    // Validación de edad de jubilación
    if (retirementYears < 18 || retirementYears > 100) {
      setError({ message: 'Edad de jubilación debe estar entre 18 y 100 años' });
      return;
    }

    const retirementDate = new Date(
      birthDateObj.getFullYear() + retirementYears,
      birthDateObj.getMonth() + retirementMonths,
      birthDateObj.getDate()
    );

    // Validación de fecha de jubilación
    if (retirementDate <= currentDate) {
      setError({ message: 'La fecha de jubilación debe ser en el futuro' });
      return;
    }

    const differenceInMillis = retirementDate.getTime() - currentDate.getTime();

    const years = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    setTimeRemaining({ years, months, days });
  };

  // Manejo de formato de fecha
  const handleDateInputChange = (text: string) => {
    // Limitar a 10 caracteres
    const formattedText = text.slice(0, 10);

    // Añadir guiones automáticamente
    if (formattedText.length === 2 || formattedText.length === 5) {
      text += '-';
    }

    setBirthDate(formattedText);
  };

  // Función de navegación de retorno
  const volver = () => router.push('/');

  return (
    <>
      {/* Metadatos SEO */}
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
        <h2 className={styles.enunciado}>Calculadora de Días hasta la Jubilación</h2>
        
        {/* Manejo de errores */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error.message}</p>
          </div>
        )}

        <label className={styles.labelText}>Fecha de Nacimiento (DD-MM-YYYY):</label>
        <input
          type="text"
          className={styles.input}
          placeholder="DD-MM-YYYY"
          value={birthDate}
          onChange={(e) => handleDateInputChange(e.target.value)}
          maxLength={10}
        />

        <label className={styles.labelText}>Edad de Jubilación:</label>
        <div className={styles.ageInputContainer}>
          <input
            type="number"
            className={styles.ageInput}
            placeholder="Años"
            value={retirementAge.years}
            onChange={(e) => setRetirementAge({ 
              ...retirementAge, 
              years: e.target.value.slice(0, 3) 
            })}
            min={18}
            max={100}
          />
          <input
            type="number"
            className={styles.ageInput}
            placeholder="Meses"
            value={retirementAge.months}
            onChange={(e) => setRetirementAge({ 
              ...retirementAge, 
              months: e.target.value.slice(0, 2) 
            })}
            min={0}
            max={11}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.touchableButtonV} 
            onClick={calculateTimeRemaining}
          >
            Calcular
          </button>
          <button 
            className={styles.touchableButtonV} 
            onClick={volver}
          >
            Volver
          </button>
        </div>

        {/* Renderizado condicional de resultados */}
        {timeRemaining.years !== null && (
          <div className={styles.resultContainer}>
            <label className={styles.labelText}>Tiempo hasta la jubilación:</label>
            <p className={styles.resultText}>
              {timeRemaining.years > 0 && `${timeRemaining.years} años`}
              {timeRemaining.years > 0 && ((timeRemaining.months ?? 0) > 0 || (timeRemaining.days ?? 0) > 0) && ', '}
              {(timeRemaining.months ?? 0) > 0 && `${timeRemaining.months} meses`}
              {(timeRemaining.months ?? 0) > 0 && (timeRemaining.days ?? 0) > 0 && ' y '}
              {(timeRemaining.days ?? 0) > 0 && `${timeRemaining.days} días`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DiasJubilacion;
