import { useRouter } from 'next/router';  // Usamos useRouter para la navegación
import styles from '../Estilos/EstiloHerramientas.module.css';

const Herramientas: React.FC = () => {
  const router = useRouter();  // Usamos useRouter en lugar de useNavigate

  const navigateToHerramientas = (ruta: string) => {
    router.push(ruta);  // Usamos router.push para navegar
  };

  const opciones = [
    { nombre: 'Calculadora de Préstamos', ruta: '/Simuladores/CalculadoraPrestamo', icono: '💰', descripcion: 'Calcula cuotas y costos de financiación para planificar tus pagos de préstamos.' },
    { nombre: 'Calculadora de Ahorros', ruta: '/Simuladores/CalculadoraAhorros', icono: '🏦', descripcion: 'Proyecta tus ahorros y establece metas financieras a largo plazo.' },
    { nombre: 'Calculadora de Inversiones', ruta: '/Simuladores/CalculadoraInversiones', icono: '📈', descripcion: 'Evalúa posibles rendimientos de tus inversiones con datos personalizados.' },
    { nombre: 'Conversor de Divisas', ruta: '/Simuladores/ConversorDivisas', icono: '💱', descripcion: 'Convierte monedas con tasas de cambio actualizadas en tiempo real.' },
    { nombre: 'Cotización de Acciones NY', ruta: '/Simuladores/RentabilidadAcciones', icono: '📊', descripcion: 'Calcula la rentabilidad de acciones cotizadas en la Bolsa de Nueva York.' },
    { nombre: 'Rendimiento para la Jubilación', ruta: '/Simuladores/SimuladorJubilacion', icono: '👴', descripcion: 'Simula tus ingresos para el retiro según tu ahorro actual y contribuciones futuras.' },
    { nombre: 'Simulador de Rentas Inmediatas', ruta: '/Simuladores/RentasInmediatas', icono: '🕒', descripcion: 'Calcula pagos periódicos de rentas inmediatas para optimizar tus ingresos.' }
  ];

  return (
    <div className={styles.herramientasContainer}>
      <h1 className={styles.herramientasTitulo}>Herramientas Financieras para Decisiones Inteligentes</h1>
      <p className={styles.descripcionPrincipal}>
        Explora nuestras herramientas diseñadas para simplificar tus finanzas. Desde préstamos hasta inversiones, cada herramienta te ayudará a tomar decisiones informadas.
      </p>
      <div className={styles.herramientasGrid}>
        {opciones.map((opcion) => (
          <div key={opcion.ruta} className={styles.herramientaCard}>
            <button
              className={styles.herramientaBoton}
              onClick={() => navigateToHerramientas(opcion.ruta)}  // Cambié la navegación a router.push
            >
              <span className={styles.herramientaIcono}>{opcion.icono}</span>
              <span className={styles.herramientaNombre}>{opcion.nombre}</span>
            </button>
            <p className={styles.herramientaDescripcion}>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herramientas;
