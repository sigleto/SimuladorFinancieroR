// components/UtilidadesFinancieras.tsx
import React from "react";
import styles from "../Estilos/EstiloInformacion.module.css";
import { FaExchangeAlt, FaChartLine, FaHourglassHalf } from "react-icons/fa";

const Herramientas2: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Utilidades Financieras</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaExchangeAlt className={styles.icon} /> Conversión de Divisas
          </h2>
          <p className={styles.parrafo}>
            Con nuestra herramienta de conversión de divisas, puedes obtener
            tasas de cambio actualizadas en tiempo real y realizar conversiones
            precisas entre diferentes monedas internacionales.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaChartLine className={styles.icon} /> Cotizaciones de la Bolsa de
            NY
          </h2>
          <p className={styles.parrafo}>
            Consulta las últimas cotizaciones de la Bolsa de Nueva York, accede
            a información relevante sobre acciones y sigue la evolución del
            mercado financiero con datos en tiempo real.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaHourglassHalf className={styles.icon} /> Cálculo de Tiempo hasta
            la Jubilación
          </h2>
          <p className={styles.parrafo}>
            Utiliza nuestra calculadora de jubilación para estimar cuántos años
            te faltan para alcanzar la edad de retiro, tomando en cuenta tus
            ingresos, ahorros y proyecciones futuras.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Herramientas2;
