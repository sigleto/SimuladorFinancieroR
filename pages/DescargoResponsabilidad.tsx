import { useRouter } from 'next/router';
import '../Estilos/EstiloDescargo.module.css'; // Asegúrate de que la ruta sea correcta

const DescargoResponsabilidad = () => {
  const router = useRouter();

  const salto = () => {
    router.push('/');
  };

  return (
    <div className="container">
      <h1 className="titulo">Hoja de Descargo de Responsabilidad:</h1>
      <p className="parrafo">
        Esta aplicación es una herramienta de simulación financiera y no debe utilizarse como un servicio financiero. No es un sustituto de la asesoría financiera profesional.
      </p>
      <p className="parrafo">
        Esta aplicación no ofrece préstamos personales ni se vincula con ninguna compañía externa que ofrezca préstamos. Tampoco ofrece la tasa de porcentaje anual (APR) ni cargos u otros costos. El usuario debe ingresar la tasa de interés y otra información relevante. Los cálculos son solo estimaciones y pueden no ser precisos.
      </p>
      <p className="parrafo">
        Las recomendaciones de esta aplicación no pueden ser adecuadas para su situación financiera y preferencias de riesgo y rendimiento. Siempre debe consultar con un asesor financiero profesional antes de tomar cualquier decisión financiera importante.
      </p>
      <h2 className="subtitulo">Adiciones específicas para su aplicación</h2>
      <h3 className="subtitulo-secundario">Cálculo de préstamos:</h3>
      <ul className="lista">
        <li>Esta aplicación no tiene en cuenta sus circunstancias individuales, como su historial crediticio, ingresos o gastos.</li>
        <li>Los cálculos de esta aplicación se basan en supuestos y pueden no ser exactos.</li>
      </ul>
      <h3 className="subtitulo-secundario">Planificación de jubilación:</h3>
      <ul className="lista">
        <li>Esta aplicación no tiene en cuenta sus objetivos de jubilación individuales, como el monto de dinero que desea ahorrar o cuándo desea jubilarse.</li>
        <li>Los cálculos de esta aplicación se basan en supuestos y pueden no ser exactos.</li>
      </ul>
      <h3 className="subtitulo-secundario">Cálculo de posibles ganancias de acciones:</h3>
      <ul className="lista">
        <li>Esta aplicación no tiene en cuenta el riesgo asociado con la inversión en acciones.</li>
        <li>Los cálculos de esta aplicación se basan en supuestos y pueden no ser exactos.</li>
      </ul>
      <h3 className="subtitulo-secundario">Conversor de monedas:</h3>
      <ul className="lista">
        <li>Las tasas de cambio utilizadas en esta aplicación son solo estimaciones y pueden no ser precisas.</li>
      </ul>
      <h3 className="subtitulo-secundario">Cálculo de rendimientos de productos:</h3>
      <ul className="lista">
        <li>Esta aplicación no tiene en cuenta el riesgo asociado con la inversión en productos financieros.</li>
        <li>Los cálculos de esta aplicación se basan en supuestos y pueden no ser exactos.</li>
      </ul>
      <div className="buttonContainer">
        <button className="skipButton" onClick={salto}>
          <span className="buttonText">VOLVER</span>
        </button>
      </div>
    </div>
  );
};

export default DescargoResponsabilidad;
