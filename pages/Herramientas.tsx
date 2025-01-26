import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../Estilos/EstiloHerramientas.module.css";

const Herramientas: React.FC = () => {
  const router = useRouter();
  const [diasRestantes, setDiasRestantes] = useState<number>(0);

  const calculateDaysUntilRetirement = () => {
    // Fecha actual
    const today = new Date();
    // Establecer la fecha de jubilación (por ejemplo, a los 65 años)
    const edadJubilacion = 65;
    const fechaNacimiento = new Date(1990, 0, 1); // Ejemplo de fecha de nacimiento
    const fechaJubilacion = new Date(fechaNacimiento);
    fechaJubilacion.setFullYear(fechaJubilacion.getFullYear() + edadJubilacion);

    // Calcular la diferencia en milisegundos y convertirla a días
    const diferencia = fechaJubilacion.getTime() - today.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24)); // Milisegundos a días
    setDiasRestantes(dias);
  };

  useEffect(() => {
    calculateDaysUntilRetirement();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const navigateToHerramientas = (ruta: string) => {
    router.push(ruta);
  };

  const opciones = [
    {
      nombre: "Calculadora de Préstamos",
      ruta: "/Simuladores/CalculadoraPrestamo",
      icono: "💰",
      descripcion:
        "Calcula cuotas y costos de financiación para planificar tus pagos de préstamos.",
    },
    {
      nombre: "Calculadora de Ahorros",
      ruta: "/Simuladores/CalculadoraAhorros",
      icono: "🏦",
      descripcion:
        "Proyecta tus ahorros y establece metas financieras a largo plazo.",
    },
    {
      nombre: "Calculadora de Inversiones",
      ruta: "/Simuladores/CalculadoraInversiones",
      icono: "📈",
      descripcion:
        "Evalúa posibles rendimientos de tus inversiones con datos personalizados.",
    },
    {
      nombre: "Conversor de Divisas",
      ruta: "/Simuladores/ConversorDivisas",
      icono: "💱",
      descripcion:
        "Convierte monedas con tasas de cambio actualizadas en tiempo real.",
    },
    {
      nombre: "Cotización de Acciones NY",
      ruta: "/Simuladores/RentabilidadAcciones",
      icono: "📊",
      descripcion:
        "Calcula la rentabilidad de acciones cotizadas en la Bolsa de Nueva York.",
    },
    {
      nombre: "Rendimiento para la Jubilación",
      ruta: "/Simuladores/SimuladorJubilacion",
      icono: "👴",
      descripcion:
        "Simula tus ingresos para el retiro según tu ahorro actual y contribuciones futuras.",
    },
    {
      nombre: "Simulador de Rentas Inmediatas",
      ruta: "/Simuladores/RentasInmediatas",
      icono: "🕒",
      descripcion:
        "Calcula pagos periódicos de rentas inmediatas para optimizar tus ingresos.",
    },
    {
      nombre: "Días Restantes para la Jubilación", // Nueva opción
      ruta: "/Simuladores/DiasJubilacion", // Este no redirige a ninguna parte, es solo para mostrar la funcionalidad
      icono: "⏳",
      descripcion: `Descubre el tiempo que te queda para jubilarte.`,
    },
  ];

  return (
    <div className={styles.herramientasContainer}>
      <h1 className={styles.herramientasTitulo}>
        Herramientas Financieras para Decisiones Inteligentes
      </h1>
      <p className={styles.descripcionPrincipal}>
        Explora nuestras herramientas diseñadas para simplificar tus finanzas.
        Desde préstamos hasta inversiones, cada herramienta te ayudará a tomar
        decisiones informadas.
      </p>
      <div className={styles.herramientasGrid}>
        {opciones.map((opcion) => (
          <div key={opcion.ruta} className={styles.herramientaCard}>
            <button
              className={styles.herramientaBoton}
              onClick={() => navigateToHerramientas(opcion.ruta)}
              disabled={opcion.ruta === "#"} // Deshabilitar el botón para la opción de días
            >
              <span className={styles.herramientaIcono}>{opcion.icono}</span>
              <span className={styles.herramientaNombre}>{opcion.nombre}</span>
            </button>
            <p className={styles.herramientaDescripcion}>
              {opcion.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herramientas;
