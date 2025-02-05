import { useRouter } from "next/router";
import styles from "../Estilos/EstiloPolitica.module.css";

const PoliticaPrivacidad = () => {
  const router = useRouter();

  const salto = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>
        Política de Privacidad de SimuladorFinanciero
      </h1>
      <p className={styles.parrafo}>
        En SimuladorFinanciero, valoramos tu privacidad y nos comprometemos a
        proteger tus datos personales. Esta política explica cómo recopilamos,
        usamos y protegemos la información que nos proporcionas al utilizar
        nuestro servicio.
      </p>

      <h2 className={styles.subtitulo}>Recopilación y Uso de Información</h2>
      <p className={styles.parrafo}>
        Nuestra aplicación no recopila información personal de los usuarios. Sin
        embargo, podemos utilizar herramientas de análisis de terceros para
        mejorar la experiencia del usuario, las cuales pueden recopilar datos
        anónimos.
      </p>

      <h2 className={styles.subtitulo}>Cookies</h2>
      <p className={styles.parrafo}>
        Las cookies son pequeños archivos de datos que se almacenan en tu
        dispositivo. Nuestro servicio no utiliza cookies directamente, pero es
        posible que los servicios de terceros que integramos (como Google
        Analytics) las utilicen. Puedes gestionar o desactivar las cookies desde
        la configuración de tu navegador.
      </p>

      <h2 className={styles.subtitulo}>Proveedores de Servicio</h2>
      <p className={styles.parrafo}>
        Para mejorar nuestro servicio, podemos trabajar con proveedores externos
        que nos ayudan a:
      </p>
      <ul className={styles.lista}>
        <li>Facilitar el funcionamiento de la aplicación.</li>
        <li>Proporcionar servicios en nuestro nombre.</li>
        <li>Analizar el uso de nuestro servicio.</li>
      </ul>

      <h2 className={styles.subtitulo}>Seguridad</h2>
      <p className={styles.parrafo}>
        Implementamos medidas de seguridad para proteger tu información. Sin
        embargo, ningún sistema es 100% seguro, por lo que no podemos garantizar
        la seguridad absoluta de tus datos.
      </p>

      <h2 className={styles.subtitulo}>Enlaces a Otros Sitios</h2>
      <p className={styles.parrafo}>
        Nuestro servicio no contiene enlaces externos. Si en el futuro agregamos
        enlaces a sitios de terceros, te recomendamos revisar sus políticas de
        privacidad.
      </p>

      <h2 className={styles.subtitulo}>Privacidad de los Niños</h2>
      <p className={styles.parrafo}>
        Nuestro servicio no está dirigido a menores de 13 años. Si descubrimos
        que hemos recopilado información de un menor sin consentimiento, la
        eliminaremos de inmediato.
      </p>

      <h2 className={styles.subtitulo}>Cambios en la Política de Privacidad</h2>
      <p className={styles.parrafo}>
        Podemos actualizar esta política ocasionalmente. Te recomendamos
        revisarla periódicamente. Los cambios entrarán en vigor inmediatamente
        después de su publicación en esta página.
      </p>

      <h2 className={styles.subtitulo}>Contáctanos</h2>
      <p className={styles.parrafo}>
        Si tienes preguntas o sugerencias sobre nuestra política de privacidad,
        contáctanos en <strong>trianabaresapp@gmail.com</strong>.
      </p>

      <div className={styles.buttonContainer}>
        <button className={styles.skipButton} onClick={salto}>
          <span className={styles.buttonText}>VOLVER AL INICIO</span>
        </button>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
