import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaChartLine, FaCalculator, FaExchangeAlt, FaPiggyBank, FaChartBar, FaUserClock, FaHourglassStart } from 'react-icons/fa';
import styles from '../Estilos/index.module.css';
import './Simuladores/CalculadoraAhorros'

const Home: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => router.push(path);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const features = [
    { icon: <FaCalculator />, text: "Simulador de Préstamos", path: "/Simuladores/CalculadoraPrestamo" },
    { icon: <FaPiggyBank />, text: "Simulador de Ahorros", path: "/Simuladores/CalculadoraAhorros" },
    { icon: <FaChartLine />, text: "Simulador de Inversiones", path: "/Simuladores/CalculadoraInversiones" },
    { icon: <FaExchangeAlt />, text: "Conversor de Divisas", path: "/Simuladores/ConversorDivisas" },
    { icon: <FaChartBar />, text: "Cotizador de Acciones NY", path: "/Simuladores/RentabilidadAcciones" },
    { icon: <FaUserClock />, text: "Simulador de Jubilación", path: "/Simuladores/SimuladorJubilacion" },
    { icon: <FaHourglassStart />, text: "Simulador de Rentas Inmediatas", path: "/Simuladores/RentasInmediatas" }
  ];

  const benefits = [
    "Maximizar ahorros y rendimientos.",
    "Planificar préstamos con pagos asequibles.",
    "Diversificar inversiones con datos realistas.",
    "Minimizar riesgos financieros con mejor información.",
    "Preparar un plan sólido para la jubilación.",
  ];

  return (
    <motion.div className={styles['home-container']} initial="hidden" animate="visible" variants={fadeIn}>
    <header className={styles['home-header']}>
      <h1 className={styles['main-title']}>Bienvenido a Simuladores Financieros</h1>
      <p className={styles['subtitle']}>La clave para optimizar tus decisiones financieras</p>
    </header>
  
    <main className={styles['main-content']}>
      <section className={styles['description-section']}>
        <h2 className={styles['section-title']}>¿Qué ofrecemos?</h2>
        <p className={styles['description']}>
          Descubre herramientas avanzadas para mejorar tus finanzas personales. Desde cálculos de préstamos hasta proyecciones de jubilación, ofrecemos soluciones intuitivas para decisiones informadas en cada etapa de tu vida financiera.
        </p>
      </section>
  
      <section className={styles['features-section']}>
        <h2 className={styles['section-title']}>Simuladores Destacados</h2>
        <div className={styles['features-grid']}>
          {features.map((feature, index) => (
            <Link key={index} href={feature.path}>
              <motion.div className={styles['feature-item']} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span className={styles['feature-icon']}>{feature.icon}</span>
                <p>{feature.text}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
  
      <section className={styles['benefits-section']}>
        <h2 className={styles['section-title']}>¿Por qué usar nuestros simuladores?</h2>
        <p className={styles['benefits-text']}>
          Decisiones financieras inteligentes son clave para tus metas a corto y largo plazo. Nuestros simuladores ayudan a:
        </p>
        <ul className={styles['benefits-list']}>
          {benefits.map((benefit, index) => (
            <motion.li key={index} className={styles['benefit-item']} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }}>
              {benefit}
            </motion.li>
          ))}
        </ul>
      </section>
  
      <motion.button onClick={() => handleNavigation('/Herramientas')} className={styles['cta-button']} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Explorar Todos los Simuladores
      </motion.button>
    </main>
  
    <footer className={styles['home-footer']}>
      <p>&copy; 2025 Finanzas Inteligentes. Diseñado para potenciar tu futuro financiero.</p>
      <div className={styles['footer-links']}>
        <Link href="/PoliticaPrivacidad">
          <motion.span className={styles['footer-link']} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Política de Privacidad
          </motion.span>
        </Link>
        <Link href="/DescargoResponsabilidad">
          <motion.span className={styles['footer-link']} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Descargo de Responsabilidad
          </motion.span>
        </Link>
      </div>
    </footer>
  </motion.div>
  
  );
};

export default Home;
