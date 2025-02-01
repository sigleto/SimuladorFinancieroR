import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from "../Estilos/index.module.css";

const Home: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => router.push(path);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const features = [
    {
      image: "/ahorros.jpg",
      title: "Simulador de Ahorro",
      description:
        "Ahorra con cabeza y haz que tu dinero crezca solo. Calcula cuánto necesitas ahorrar mensualmente para alcanzar tus metas financieras.",
      path: "/Simuladores/CalculadoraAhorros",
    },
    {
      image: "/prestamon.jpg",
      title: "Simulador de Préstamos",
      description:
        "¿Cuánto pagarás al mes? Descúbrelo antes de endeudarte. Compara diferentes opciones de préstamos y elige la mejor para ti.",
      path: "/Simuladores/CalculadoraPrestamo",
    },
    {
      image: "/inversion.jpg",
      title: "Simulador de Inversiones",
      description:
        "Pon tu dinero a trabajar y mira cuánto podrías ganar. Evalúa el rendimiento de tus inversiones con datos personalizados.",
      path: "/Simuladores/CalculadoraInversiones",
    },
    {
      image: "/inmediata.jpg",
      title: "Simulador de Rentas Inmediatas",
      description:
        "¿Cuánto ganarás cada mes? Haz números y decide. Calcula los pagos periódicos de rentas inmediatas para optimizar tus ingresos.",
      path: "/Simuladores/RentasInmediatas",
    },
    {
      image: "/prestamo.jpg",
      title: "Simuladores Hipotecarios",
      description:
        "Calcula cuánto pagarás mensualmente por tu hipoteca y planifica tu presupuesto con precisión.",
      path: "/Simuladores/SimuladoresHipotecarios",
    },
    {
      image: "/jubilacion.jpg",
      title: "Simulador de Jubilación",
      description:
        "Planifica tu retiro sin sorpresas y con tranquilidad. Simula tus ingresos para la jubilación según tu ahorro actual y contribuciones futuras.",
      path: "/Simuladores/SimuladorJubilacion",
    },
  ];

  return (
    <>
      <Head>
        <title>Simuladores Financieros - Herramientas para tus Finanzas</title>
        <meta
          name="description"
          content="Herramientas avanzadas para optimizar tus decisiones financieras. Simuladores de préstamos, ahorros, inversiones, jubilación y más. Planifica tu futuro financiero con nosotros."
        />
        <meta
          name="keywords"
          content="simuladores financieros, calculadora de ahorros, préstamos, inversiones, jubilación, rentas inmediatas, finanzas personales"
        />
      </Head>

      <motion.div
        className={styles["home-container"]}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <header className={styles["home-header"]}>
          <h1 className={styles["main-title"]}>
            Bienvenido a Simuladores Financieros
          </h1>
          <p className={styles["subtitle"]}>
            La clave para optimizar tus decisiones financieras
          </p>
        </header>
        <main className={styles["main-content"]}>
          <section className={styles["description-section"]}>
            <h2 className={styles["section-title"]}>¿Qué ofrecemos?</h2>
            <p className={styles["description"]}>
              En Simuladores Financieros, te ofrecemos herramientas avanzadas
              para mejorar tus finanzas personales. Desde cálculos de préstamos
              hasta proyecciones de jubilación, nuestras soluciones intuitivas
              te ayudarán a tomar decisiones informadas en cada etapa de tu vida
              financiera. Nuestros simuladores están diseñados para ser fáciles
              de usar y proporcionar resultados precisos.
            </p>
            <p className={styles["description"]}>
              Ya sea que estés planeando tu jubilación, buscando optimizar tus
              inversiones o calculando préstamos, tenemos la herramienta
              perfecta para ti. Explora nuestras calculadoras y comienza a
              planificar tu futuro financiero hoy mismo.
            </p>
          </section>
          <section className={styles["features-section"]}>
            <h2 className={styles["section-title"]}>Simuladores Destacados</h2>
            <div className={styles["features-grid"]}>
              {features.map((feature, index) => (
                <Link key={index} href={feature.path}>
                  <div className={styles["feature-item"]}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className={styles["feature-image"]}
                    />
                    <h3 className={styles["feature-title"]}>{feature.title}</h3>
                    <p className={styles["feature-description"]}>
                      {feature.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <motion.button
            onClick={() => handleNavigation("/Herramientas")}
            className={styles["cta-button"]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubre todos los simuladores
          </motion.button>

          <section className={styles["benefits-explanation"]}>
            <div className={styles["benefits-text"]}>
              <h3>Potencia tu Futuro Financiero</h3>
              <p>
                En el complejo mundo de las finanzas personales, tomar
                decisiones informadas es crucial para asegurar un futuro
                próspero y estable. Nuestros simuladores financieros son mucho
                más que simples herramientas de cálculo; son tu aliado
                estratégico en la planificación financiera.
              </p>

              <h3>Beneficios Clave</h3>
              <ul>
                <li>Visualización precisa de escenarios financieros</li>
                <li>Optimización de estrategias de ahorro e inversión</li>
                <li>Reducción de riesgos financieros</li>
                <li>Planificación clara de metas a corto y largo plazo</li>
              </ul>

              <p>
                Cada simulador está diseñado para ofrecerte insights profundos y
                personalizados. Ya sea que estés planeando tu jubilación,
                buscando optimizar tus inversiones o calculando préstamos,
                tenemos la herramienta perfecta para ti.
              </p>

              <h3>Transformación Financiera</h3>
              <p>
                No se trata solo de números, sino de empoderar tu toma de
                decisiones. Con información clara y herramientas intuitivas,
                podrás diseñar tu estrategia financiera con confianza y
                precisión.
              </p>
            </div>
          </section>
        </main>
        <footer className={styles["home-footer"]}>
          <p>
            &copy; 2025 Finanzas Inteligentes. Diseñado para potenciar tu futuro
            financiero.
          </p>
          <div className={styles["footer-links"]}>
            <Link href="/PoliticaPrivacidad">
              <motion.span
                className={styles["footer-link"]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Política de Privacidad
              </motion.span>
            </Link>
            <Link href="/DescargoResponsabilidad">
              <motion.span
                className={styles["footer-link"]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Descargo de Responsabilidad
              </motion.span>
            </Link>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default Home;
