// components/InformacionSimuladores.tsx
import React from "react";
import styles from "../Estilos/EstiloInformacion.module.css";
import { useRouter } from "next/router";
import {
  FaInfoCircle,
  FaBullseye,
  FaCalculator,
  FaArrowLeft,
  FaExchangeAlt,
  FaChartLine,
} from "react-icons/fa";

const InformacionSimuladores: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <FaInfoCircle className={styles.headerIcon} />
        <h1 className={styles.titulo}>
          Información sobre Simuladores Financieros
        </h1>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <p className={styles.parrafo}>
            Nuestra plataforma ofrece herramientas de simulación financiera para
            ayudarte a tomar decisiones informadas sobre préstamos, ahorros,
            inversiones y más. Con nuestros simuladores, puedes estimar costos,
            beneficios y comparar diferentes opciones de manera sencilla.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaBullseye className={styles.icon} /> Nuestro Objetivo
          </h2>
          <p className={styles.parrafo}>
            Brindar simuladores financieros fáciles de usar para que puedas
            evaluar diferentes escenarios y tomar decisiones financieras con
            mayor seguridad y conocimiento.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaCalculator className={styles.icon} /> ¿Qué Puedes Simular?
          </h2>
          <ul className={styles.lista}>
            <li>Préstamos y cuotas mensuales</li>
            <li>Intereses y rendimientos de inversiones</li>
            <li>Ahorros y planificación financiera</li>
            <li>Comparación de opciones de financiamiento</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaExchangeAlt className={styles.icon} /> Conversión de Divisas
          </h2>
          <p className={styles.parrafo}>
            Ofrecemos un servicio de conversión de divisas en tiempo real para
            ayudarte a conocer el valor de diferentes monedas y facilitar tus
            transacciones internacionales.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaChartLine className={styles.icon} /> Cotizaciones de la Bolsa de
            NY
          </h2>
          <p className={styles.parrafo}>
            Accede a información actualizada sobre las cotizaciones de la Bolsa
            de Nueva York, permitiéndote seguir la evolución del mercado y tomar
            mejores decisiones de inversión.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <button onClick={() => router.push("/")} className={styles.button}>
          <FaArrowLeft className={styles.buttonIcon} /> Volver al Inicio
        </button>
      </footer>
    </div>
  );
};

export default InformacionSimuladores;
