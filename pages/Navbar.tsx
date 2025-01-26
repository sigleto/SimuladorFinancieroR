import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHome,
  FaClipboardList,
  FaCalculator,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import styles from "../Estilos/EstiloNavbar.module.css"; // Asegúrate de que este archivo CSS tenga el código anterior

const menuItems = [
  { label: "Inicio", path: "/", icon: <FaHome /> },
  { label: "Herramientas", path: "/Herramientas2", icon: <FaClipboardList /> },
  {
    label: "Simulador",
    path: "/Herramientas",
    icon: <FaCalculator />,
  },
  { label: "Información", path: "/Informacion", icon: <FaInfoCircle /> },
  { label: "Contacto", path: "/Contacto", icon: <FaEnvelope /> },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>Simuladores Financieros</div>

        <div className={styles.desktopMenu}>
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <motion.div
                className={styles.menuItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        <div
          className={styles.mobileMenuToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </div>

        {isOpen && (
          <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className={styles.mobileMenuItem}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
