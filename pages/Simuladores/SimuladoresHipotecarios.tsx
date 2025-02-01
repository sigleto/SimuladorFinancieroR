import React from "react";
import { useRouter } from "next/router";
import styles from "../../Estilos/EstiloHipotecas.module.css";

export default function SimuladoresHipotecarios() {
  const router = useRouter();

  const navigateToSimulator = (simulatorType: string) => {
    switch (simulatorType) {
      case "cuotaEstandar":
        router.push("CalculadoraHipoteca");
        break;
      case "cuotaCarencia":
        router.push("CalculadoraCarencia");
        break;
      case "cuotaAmortizacion":
        router.push("CalculadoraAmortizacionAnticipada");
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simuladores Hipotecarios</h1>

      <p className={styles.description}>
        Bienvenido a nuestra sección de simuladores hipotecarios. Aquí
        encontrarás herramientas útiles para calcular diferentes aspectos de tu
        hipoteca, lo que te ayudará a tomar decisiones financieras más
        informadas. Utiliza estos simuladores para estimar cuotas, plazos y
        condiciones de tu préstamo hipotecario.
      </p>

      <h2 className={styles.subtitle}>Selecciona un simulador:</h2>

      <button
        className={styles.button}
        onClick={() => navigateToSimulator("cuotaEstandar")}
      >
        Calcular cuota de un préstamo estándar
      </button>
      <p className={styles.infoText}>
        Este simulador te permite calcular la cuota mensual de un préstamo
        hipotecario basado en el capital, el interés y el plazo.
      </p>

      <button
        className={styles.button}
        onClick={() => navigateToSimulator("cuotaCarencia")}
      >
        Calcular cuota con periodo de carencia
      </button>
      <p className={styles.infoText}>
        Ideal para préstamos con un periodo de carencia inicial, donde solo
        pagas intereses durante un tiempo determinado antes de comenzar con las
        cuotas completas.
      </p>

      <button
        className={styles.button}
        onClick={() => navigateToSimulator("cuotaAmortizacion")}
      >
        Calcular cuota o plazo con amortización anticipada
      </button>
      <p className={styles.infoText}>
        Este simulador te ayuda a calcular cómo afecta una amortización
        anticipada a las cuotas o al plazo de tu hipoteca, permitiéndote ahorrar
        intereses.
      </p>

      <h2 className={styles.subtitle}>Preguntas Frecuentes (FAQ)</h2>
      <div className={styles.faqSection}>
        <h3>¿Por qué es importante calcular la cuota de tu hipoteca?</h3>
        <p>
          Conocer la cuota mensual te permite planificar mejor tu economía
          personal y evaluar si puedes afrontar el préstamo de forma segura.
        </p>

        <h3>¿Qué es un periodo de carencia?</h3>
        <p>
          Es un periodo inicial en el que solo pagas intereses, lo cual puede
          ser útil si necesitas reducir temporalmente tus gastos.
        </p>

        <h3>¿Cómo afecta la amortización anticipada a mi hipoteca?</h3>
        <p>
          La amortización anticipada reduce el capital pendiente, lo que puede
          disminuir el importe de tus cuotas o acortar la duración del préstamo,
          generando ahorro en intereses.
        </p>
      </div>
    </div>
  );
}
