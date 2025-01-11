import { useState } from 'react';
import { useRouter } from 'next/router';  // Usamos useRouter en lugar de useNavigate
import styles from '../../Estilos/EstiloCalculadoras.module.css';  // Importamos los estilos

export default function App() {
  const [edadActual, setEdadActual] = useState<string>('');
  const [edadJubilacion, setEdadJubilacion] = useState<string>('');
  const [montoActual, setMontoActual] = useState<string>('');
  const [tasaInteres, setTasaInteres] = useState<string>('');

  const router = useRouter();  // Usamos useRouter para la navegación

  const calcularJubilacion = () => {
    if (!edadActual || !edadJubilacion || !montoActual || !tasaInteres) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    router.push({
      pathname: 'resultados/ResultadoJubilacion',
      query: { edadActual, edadJubilacion, montoActual, tasaInteres },  // Pasamos los parámetros como query
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.labelA}>Calculadora de Jubilación</h2>

      <div className={styles.inputContainer}>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="number"
            placeholder="Edad actual"
            value={edadActual}
            onChange={(e) => setEdadActual(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="number"
            placeholder="Edad de jubilación"
            value={edadJubilacion}
            onChange={(e) => setEdadJubilacion(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="number"
            placeholder="Monto actual"
            value={montoActual}
            onChange={(e) => setMontoActual(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="number"
            placeholder="Tasa de interés anual (%)"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
          />
        </div>
      </div>

      <button className={styles.touchableButton} onClick={calcularJubilacion}>
        <span className={styles.buttonText}>Calcular</span>
      </button>
    </div>
  );
}
