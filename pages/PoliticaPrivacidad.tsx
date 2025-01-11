import { useRouter } from 'next/router'; // Usar useRouter en lugar de useNavigate
import '../Estilos/EstiloPolitica.module.css'; // Asegúrate de que la ruta del archivo CSS sea correcta

const PoliticaPrivacidad = () => {
  const router = useRouter(); // Usar useRouter para la navegación

  const salto = () => {
    router.push('/'); // Cambiar la navegación a la ruta principal ("/")
  };

  return (
    <div className="container">
      <div>
        <h1 className="titulo">Política de privacidad de SimuladorFinanciero:</h1>
        <p className="parrafo">
          Se ha construido la aplicación Simulador Financiero como una página web gratuita. Este SERVICIO es proporcionado sin costo alguno y está destinado a ser utilizado tal cual. Esta página se utiliza para informar a los visitantes sobre nuestras políticas con respecto a la recopilación, el uso y la divulgación de Información personal si alguien decide utilizar mi Servicio. Si elige usar nuestro Servicio, entonces acepta la recopilación y el uso de información en relación con esta política. La información personal que se recopila se utiliza para proporcionar y mejorar el Servicio. No se usará ni compartirá su información con nadie, excepto como se describe en esta Política de privacidad. Los términos utilizados en esta Política de privacidad tienen los mismos significados que en nuestros Términos y condiciones, a los que se puede acceder en Todo-Trámite a menos que se defina lo contrario en esta Política de privacidad.
        </p>
        <p className="parrafo">
          <strong>Recopilación y uso de información</strong><br /><br />
          Esta página no recopila ningún tipo de información personal.
        </p>
        <p className="parrafo">
          <strong>Cookies</strong><br /><br />
          Las cookies son archivos con una pequeña cantidad de datos que se utilizan comúnmente como identificadores únicos anónimos. Estos se envían a su navegador desde los sitios web que visita y se almacenan en la memoria interna de su dispositivo. Este Servicio no utiliza estas 'cookies' de forma explícita. Sin embargo, la aplicación puede usar código y bibliotecas de terceros que usan 'cookies' para recopilar información y mejorar sus servicios. Tiene la opción de aceptar o rechazar estas cookies y saber cuándo se envía una cookie a su dispositivo. Si elige rechazar nuestras cookies, es posible que no pueda utilizar algunas partes de este Servicio.
        </p>
        <p className="parrafo">
          <strong>Proveedores de servicio</strong><br /><br />
          Podemos emplear empresas e individuos de terceros debido a las siguientes razones:
          <ul>
            <li>Para facilitar nuestro Servicio;</li>
            <li>Para proporcionar el Servicio en nuestro nombre;</li>
            <li>Para realizar servicios relacionados con el Servicio; o</li>
            <li>Para ayudarnos a analizar cómo se utiliza nuestro Servicio.</li>
          </ul>
        </p>
        <p className="parrafo">
          <strong>Seguridad</strong><br /><br />
          Valoramos tu confianza al proporcionarnos su información personal, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Pero recuerda que ningún método de transmisión por Internet, o método de almacenamiento electrónico es 100% seguro y confiable, y no podemos garantizar tu seguridad absoluta.
        </p>
        <p className="parrafo">
          <strong>Enlaces a otros sitios</strong><br /><br />
          Este Servicio no contiene enlaces a otros sitios.
        </p>
        <p className="parrafo">
          <strong>Privacidad de los niños</strong><br /><br />
          Estos Servicios no están dirigidos a personas menores de 13 años. No recopilamos a sabiendas información de identificación personal de niños menores de 13 años. En caso de que descubra que un niño menor de 13 años nos ha proporcionado información personal, la eliminaremos inmediatamente de nuestros servidores. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado información personal, comuníquese con nosotros para que podamos tomar las medidas necesarias.
        </p>
        <p className="parrafo">
          <strong>Cambios a esta Política de privacidad</strong><br /><br />
          Podemos actualizar nuestra Política de privacidad de vez en cuando. Por lo tanto, se le recomienda revisar esta página periódicamente para ver si hay cambios. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Esta política es efectiva a partir del 2023-10-10
        </p>
        <p className="parrafo">
          <strong>Contáctanos</strong><br /><br />
          Si tienes alguna pregunta o sugerencia sobre nuestra Política de Privacidad, no dudes en ponerte en contacto con nosotros en trianabaresapp@gmail.com.
        </p>
      </div>
      <div className="buttonContainer">
        <button className="skipButton" onClick={salto}>
          <span className="buttonText">VOLVER</span>
        </button>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
