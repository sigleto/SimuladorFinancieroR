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
  FaHandHoldingUsd,
  FaRegLightbulb,
} from "react-icons/fa";

const InformacionSimuladores: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <FaInfoCircle className={styles.headerIcon} />
        <h1 className={styles.titulo}>
          Información sobre Simuladores Financieros
        </h1>
      </header>

      {/* Contenido principal */}
      <main className={styles.main}>
        {/* Introducción */}
        <section className={styles.section}>
          <p className={styles.parrafo}>
            Bienvenido a nuestra plataforma de simuladores financieros. Aquí
            encontrarás herramientas diseñadas para ayudarte a tomar decisiones
            informadas sobre tus finanzas personales. Desde calcular préstamos
            hasta planificar tu jubilación, nuestros simuladores son fáciles de
            usar y están optimizados para ofrecer resultados precisos y
            personalizados.
          </p>
        </section>

        {/* Objetivo */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaBullseye className={styles.icon} /> Nuestro Objetivo
          </h2>
          <p className={styles.parrafo}>
            Nuestro propósito es empoderarte financieramente mediante
            herramientas que simplifiquen la toma de decisiones. Con nuestros
            simuladores, podrás visualizar diversos escenarios financieros y
            planificar estratégicamente para alcanzar tus metas.
          </p>
        </section>

        {/* Funcionalidades destacadas */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaCalculator className={styles.icon} /> ¿Qué Puedes Simular?
          </h2>
          <ul className={styles.lista}>
            <li>Cuotas mensuales de préstamos personales e hipotecarios.</li>
            <li>Intereses generados por inversiones a corto y largo plazo.</li>
            <li>Proyecciones de ahorro según tus objetivos financieros.</li>
            <li>Comparación entre diferentes opciones de financiamiento.</li>
            <li>Planificación detallada para la jubilación.</li>
          </ul>
        </section>

        {/* Conversión de divisas */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaExchangeAlt className={styles.icon} /> Conversión de Divisas
          </h2>
          <p className={styles.parrafo}>
            Nuestra herramienta de conversión de divisas te permite calcular el
            valor actualizado de diferentes monedas en tiempo real. Ideal para
            viajeros o quienes realizan transacciones internacionales.
          </p>
        </section>

        {/* Cotizaciones bursátiles */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaChartLine className={styles.icon} /> Cotizaciones Bursátiles
          </h2>
          <p className={styles.parrafo}>
            Mantente informado sobre las últimas cotizaciones del mercado
            financiero, incluyendo datos actualizados sobre la Bolsa de Nueva
            York (NYSE). Esto te permitirá tomar decisiones más acertadas en tus
            inversiones.
          </p>
        </section>

        {/* Beneficios clave */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaHandHoldingUsd className={styles.icon} /> Beneficios Clave
          </h2>
          <ul className={styles.lista}>
            <li>Optimización de estrategias financieras personales.</li>
            <li>Reducción de riesgos al evaluar diferentes escenarios.</li>
            <li>
              Planificación clara y efectiva para metas a corto y largo plazo.
            </li>
            <li>Acceso a herramientas confiables y fáciles de usar.</li>
          </ul>
        </section>

        {/* Consejos adicionales */}
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaRegLightbulb className={styles.icon} /> Consejos para Usar los
            Simuladores
          </h2>
          <p className={styles.parrafo}>
            Experimenta con diferentes configuraciones en los simuladores para
            descubrir cómo pequeños cambios pueden impactar tus finanzas. Por
            ejemplo, prueba ajustar los plazos o tasas en un simulador de
            préstamos para encontrar la opción más adecuada para ti.
          </p>
          <p className={styles.parrafo}>
            Además, utiliza estas herramientas como una guía inicial, pero
            considera consultar con un asesor financiero profesional para
            decisiones más complejas.
          </p>
        </section>
      </main>

      {/* Pie de página */}
      <footer className={styles.footer}>
        <button onClick={() => router.push("/")} className={styles.button}>
          <FaArrowLeft className={styles.buttonIcon} /> Volver al Inicio
        </button>
      </footer>
    </div>
  );
};

export default InformacionSimuladores;
