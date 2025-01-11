import React, { useState } from 'react';
import styles from '../../../Estilos/EstiloResultados.module.css';

interface RetirementAge {
  years: string;
  months: string;
}

interface TimeRemaining {
  years: number | null;
  months: number | null;
  days: number | null;
}

const DiasJubilacion: React.FC = () => {
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

  const calculateTimeRemaining = () => {
    if (!birthDate || (!retirementAge.years && !retirementAge.months)) {
      alert('Por favor, ingresa la fecha de nacimiento y la edad de jubilación.');
      return;
    }

    const currentDate = new Date();
    const [day, month, year] = birthDate.split('-').map((part) => parseInt(part, 10));
    const birthDateObj = new Date(year, month - 1, day);

    const retirementYears = parseInt(retirementAge.years, 10) || 0;
    const retirementMonths = parseInt(retirementAge.months, 10) || 0;

    const retirementDate = new Date(
      birthDateObj.getFullYear() + retirementYears,
      birthDateObj.getMonth() + retirementMonths,
      birthDateObj.getDate()
    );

    const differenceInMillis = retirementDate.getTime() - currentDate.getTime();

    const years = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    setTimeRemaining({ years, months, days });
  };

  const handleDateInputChange = (text: string) => {
    if (text.length === 2 || text.length === 5) {
      text += '-';
    }
    setBirthDate(text);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.enunciado}>Calculadora de Días hasta la Jubilación</h2>
      
      <label className={styles.labelText}>Fecha de Nacimiento (DD-MM-YYYY):</label>
      <input
        type="text"
        className={styles.input}
        placeholder="DD-MM-YYYY"
        value={birthDate}
        onChange={(e) => handleDateInputChange(e.target.value)}
      />

      <label className={styles.labelText}>Edad de Jubilación:</label>
      <div className={styles.ageInputContainer}>
        <input
          type="text"
          className={styles.ageInput}
          placeholder="Años"
          value={retirementAge.years}
          onChange={(e) => setRetirementAge({ ...retirementAge, years: e.target.value })}
        />
        <input
          type="text"
          className={styles.ageInput}
          placeholder="Meses"
          value={retirementAge.months}
          onChange={(e) => setRetirementAge({ ...retirementAge, months: e.target.value })}
        />
      </div>

      <button className={styles.touchableButton} onClick={calculateTimeRemaining}>
        Calcular
      </button>

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
  );
};

export default DiasJubilacion;
