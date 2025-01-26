import React from "react";
import styles from "../Estilos/EstiloContacto.module.css";
import { useRouter } from "next/router";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const Contacto: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>
        <FaEnvelope className={styles.icon} /> Contáctanos
      </h1>
      <div className={styles.card}>
        <p className={styles.parrafo}>
          ¿Tienes alguna sugerencia o quieres compartir tu experiencia con
          nosotros? ¡Nos encantaría escucharte!
        </p>
        <a
          href="mailto:trianabaresapp@gmail.com"
          className={styles.emailButton}
        >
          Envíanos un correo
        </a>
        <p className={styles.emailText}>trianabaresapp@gmail.com</p>
      </div>
      <button onClick={() => router.push("/")} className={styles.backButton}>
        <FaArrowLeft className={styles.buttonIcon} /> Volver al inicio
      </button>
    </div>
  );
};

export default Contacto;
