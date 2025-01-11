import { useRouter } from 'next/router';  // Usamos useRouter para la navegación
import styles from '../Estilos/EstiloHerramientas.module.css';

const Herramientas: React.FC = () => {
  const router = useRouter();  // Usamos useRouter en lugar de useNavigate

  const navigateToHerramientas = (ruta: string) => {
    router.push(ruta);  // Usamos router.push para navegar
  };

  const opciones = [
    { nombre: 'Calculadora de Préstamos', ruta: '/Simuladores/CalculadoraPrestamo', icono: '💰' },
    { nombre: 'Calculadora de Ahorros', ruta: '/Simuladores/CalculadoraAhorros', icono: '🏦' },
    { nombre: 'Calculadora de Inversiones', ruta: '/Simuladores/CalculadoraInversiones', icono: '📈' },
    { nombre: 'Conversor de Divisas', ruta: '/Simuladores/ConversorDivisas', icono: '💱' },
    { nombre: 'Cotización de Acciones NY', ruta: '/Simuladores/RentabilidadAcciones', icono: '📊' },
    { nombre: 'Rendimiento para la Jubilación', ruta: '/Simuladores/SimuladorJubilacion', icono: '👴' },
  ];

  return (
    <div className={styles.herramientasContainer}>
      <h1 className={styles.herramientasTitulo}>Seleccione una Herramienta Financiera</h1>
      <div className={styles.herramientasGrid}>
        {opciones.map((opcion) => (
          <button
            key={opcion.ruta}
            className={styles.herramientaBoton}
            onClick={() => navigateToHerramientas(opcion.ruta)}  // Cambié la navegación a router.push
          >
            <span className={styles.herramientaIcono}>{opcion.icono}</span>
            <span className={styles.herramientaNombre}>{opcion.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Herramientas;
