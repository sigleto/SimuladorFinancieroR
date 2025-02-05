import React from "react";
import styles from "../Estilos/EstiloContacto.module.css";
import { useRouter } from "next/router";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const Contacto: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>
        <FaEnvelope className={styles.icon} /> Contáctame
      </h1>

      <div className={styles.intro}>
        <p className={styles.parrafo}>
          ¿Tienes alguna pregunta, sugerencia o comentario? Estoy aquí para
          ayudarte. Completa el formulario a continuación y me pondré en
          contacto contigo lo antes posible.
        </p>
      </div>

      <div className={styles.formContainer}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSewMn0DJb0rj3DjMax1C6OEh2I2z27NcfjF8_A-Ey4Q643-pQ/viewform?embedded=true"
          width="640"
          height="719"
          style={{ border: "none" }}
          title="Formulario de contacto"
        >
          Cargando…
        </iframe>
      </div>

      <button onClick={() => router.push("/")} className={styles.backButton}>
        <FaArrowLeft className={styles.buttonIcon} /> Volver al inicio
      </button>
    </div>
  );
};

export default Contacto;
