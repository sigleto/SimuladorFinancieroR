// components/UtilidadesFinancieras.tsx
import React from "react";
import styles from "../Estilos/EstiloHerramientas2.module.css";
import { FaExchangeAlt, FaChartLine, FaHourglassHalf } from "react-icons/fa";

const Herramientas2: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Utilidades Financieras</h1>
        <p className={styles.intro}>
          En esta sección, encontrarás una serie de herramientas financieras
          diseñadas para ayudarte a tomar decisiones informadas sobre tus
          finanzas personales y profesionales. Desde la conversión de divisas
          hasta el seguimiento de las cotizaciones de la bolsa, nuestras
          utilidades están aquí para simplificar tu vida financiera.
        </p>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            <FaExchangeAlt className={styles.icon} /> Conversión de Divisas
          </h2>
          <p className={styles.parrafo}>
            Con nuestra herramienta de conversión de divisas, puedes obtener
            tasas de cambio actualizadas en tiempo real y realizar conversiones
            precisas entre diferentes monedas internacionales. Esta herramienta
            es ideal para viajeros, inversores internacionales y cualquier
            persona que necesite manejar múltiples monedas.
          </p>
          <p className={styles.parrafo}>
            Además, te ofrecemos información sobre las fluctuaciones históricas
            de las divisas, lo que te permitirá analizar tendencias y tomar
            decisiones más informadas sobre cuándo realizar tus transacciones.
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
            mercado financiero con datos en tiempo real. Nuestra plataforma te
            permite monitorear tus inversiones y estar al tanto de las noticias
            más importantes que afectan al mercado.
          </p>
          <p className={styles.parrafo}>
            También te proporcionamos análisis detallados de las principales
            empresas que cotizan en la bolsa, incluyendo gráficos interactivos y
            pronósticos de expertos. Esto te ayudará a identificar oportunidades
            de inversión y a gestionar mejor tu cartera de valores.
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
            ingresos, ahorros y proyecciones futuras. Esta herramienta te
            ayudará a planificar tu futuro financiero y a asegurarte de que
            estás en el camino correcto para disfrutar de una jubilación cómoda.
          </p>
          <p className={styles.parrafo}>
            Además, te ofrecemos consejos prácticos sobre cómo aumentar tus
            ahorros para la jubilación, incluyendo estrategias de inversión y
            recomendaciones sobre cómo reducir tus gastos sin sacrificar tu
            calidad de vida.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitulo}>
            Consejos Adicionales para una Buena Planificación Financiera
          </h2>
          <p className={styles.parrafo}>
            La planificación financiera es clave para alcanzar tus metas a largo
            plazo. Aquí te dejamos algunos consejos adicionales que te ayudarán
            a mejorar tu salud financiera:
          </p>
          <ul className={styles.lista}>
            <li>
              <strong>Diversifica tus inversiones:</strong> No pongas todos tus
              huevos en la misma canasta. Diversificar tus inversiones te
              ayudará a reducir el riesgo y a maximizar tus retornos.
            </li>
            <li>
              <strong>Mantén un fondo de emergencia:</strong> Es importante
              tener ahorros suficientes para cubrir al menos 3-6 meses de gastos
              en caso de una emergencia.
            </li>
            <li>
              <strong>Revisa regularmente tu presupuesto:</strong> Asegúrate de
              que estás gastando dentro de tus posibilidades y ajusta tu
              presupuesto según sea necesario.
            </li>
            <li>
              <strong>Educación financiera continua:</strong> Mantente informado
              sobre las últimas tendencias y herramientas financieras para tomar
              decisiones más informadas.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Herramientas2;
