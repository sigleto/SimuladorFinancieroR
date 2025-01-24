import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

type DataTableEntry = {
  periodo: number;
  saldo: string;
  rendimientoPeriodo: string;
  rendimientoAcumulado: string;
};

const CalculadoraInversionesUnificada: React.FC = () => {
  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    time: '',
    contributions: '0',
    tipoInteres: 'anual',
    unidadPeriodo: 'años',
  });

  const [result, setResult] = useState<string | null>(null);
  const [totalIntereses, setTotalIntereses] = useState<string>('');
  const [rendimientoAcumulado, setRendimientoAcumulado] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calcularInversion = () => {
    const { principal, rate, time, contributions, tipoInteres, unidadPeriodo } = formData;
    if (!principal || !rate || !time || !contributions) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    const principalAmount = parseFloat(principal);
    const ratePercentage = parseFloat(rate) / 100;
    const timePeriod = parseFloat(time);
    const annualContributions = parseFloat(contributions);

    let totalIntereses = 0;
    let totalPagado = principalAmount;
    let rendimientoAcumulado = 0;

    if (tipoInteres === 'anual' && unidadPeriodo === 'años') {
      for (let i = 0; i < timePeriod; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions + interest;
      }
    } else {
      const totalMonths = unidadPeriodo === 'años' ? timePeriod * 12 : timePeriod;
      const monthlyRate = ratePercentage / 12;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * monthlyRate;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    }

    rendimientoAcumulado = totalPagado - principalAmount;
    setResult(totalPagado.toFixed(2));
    setTotalIntereses(totalIntereses.toFixed(2));
    setRendimientoAcumulado(rendimientoAcumulado.toFixed(2));
    setIsLoading(false);
  };

  const AccesoTabla = () => {
    const { principal, rate, time, contributions, tipoInteres, unidadPeriodo } = formData;
    if (!principal || !rate || !time || !contributions) return;

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const c = parseFloat(contributions);

    const n = unidadPeriodo === 'años' ? t : t;
    const periodicRate = tipoInteres === 'anual' ? r / 100 : Math.pow(1 + r / 100, 12) - 1;

    let saldoPendiente = p;
    let rendimientoTotal = 0;
    const data: DataTableEntry[] = [];

    for (let i = 1; i <= n; i++) {
      const interesPeriodo = saldoPendiente * (unidadPeriodo === 'años' ? periodicRate : periodicRate / 12);
      const contribucionPeriodo = unidadPeriodo === 'años' ? c : c / 12;
      const valorFuturo = saldoPendiente + interesPeriodo + contribucionPeriodo;
      const rendimientoPeriodo = valorFuturo - saldoPendiente - contribucionPeriodo;

      data.push({
        periodo: i,
        saldo: valorFuturo.toFixed(2),
        rendimientoPeriodo: rendimientoPeriodo.toFixed(2),
        rendimientoAcumulado: (rendimientoTotal + rendimientoPeriodo).toFixed(2),
      });

      rendimientoTotal += rendimientoPeriodo;
      saldoPendiente = valorFuturo;
    }

    router.push({
      pathname: 'resultados/TablaInversion',
      query: { data: JSON.stringify(data), unidadPeriodo, rendimientoAcumulado, totalIntereses },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Inversiones</h1>
      <p className={styles.description}>
        Utilice esta calculadora para planificar sus inversiones a largo plazo. 
        Ingrese su capital inicial, tasa de interés, duración de la inversión y contribuciones anuales 
        para obtener una proyección detallada de su inversión.
      </p>
      
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="principal">Capital Inicial ($)</label>
          <input
            className={styles.input}
            id="principal"
            name="principal"
            type="number"
            value={formData.principal}
            onChange={handleInputChange}
            placeholder="Ej: 10000"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rate">Tasa de Interés Anual (%)</label>
          <input
            className={styles.input}
            id="rate"
            name="rate"
            type="number"
            value={formData.rate}
            onChange={handleInputChange}
            placeholder="Ej: 5"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="time">Duración de la Inversión</label>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              id="time"
              name="time"
              type="number"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="Ej: 5"
            />
            <select
              className={styles.input}
              name="unidadPeriodo"
              value={formData.unidadPeriodo}
              onChange={handleInputChange}
            >
              <option value="años">Años</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contributions">Contribuciones Anuales ($)</label>
          <input
            className={styles.input}
            id="contributions"
            name="contributions"
            type="number"
            value={formData.contributions}
            onChange={handleInputChange}
            placeholder="Ej: 1000"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tipoInteres">Tipo de Interés</label>
          <select
            className={styles.input}
            id="tipoInteres"
            name="tipoInteres"
            value={formData.tipoInteres}
            onChange={handleInputChange}
          >
            <option value="anual">Anual</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>

        <button type="button" onClick={calcularInversion} className={styles.button}>
          Calcular Inversión
        </button>
        <button type="button" onClick={AccesoTabla} className={styles.toggleButton}>
          Ver Tabla Detallada
        </button>
      </form>

      {isLoading ? (
        <p className={styles.loading}>Calculando resultados...</p>
      ) : result ? (
        <div className={styles.resultados}>
          <h2 className={styles.enunciado}>Resultados de la Inversión</h2>
          <p><span className={styles.labelText}>Valor Futuro:</span> <span className={styles.resultText}>${result}</span></p>
          <p><span className={styles.labelText}>Rendimiento Acumulado:</span> <span className={styles.resultText}>${rendimientoAcumulado}</span></p>
          <p><span className={styles.labelText}>Total de Intereses Ganados:</span> <span className={styles.resultText}>${totalIntereses}</span></p>
        </div>
      ) : null}

      <p className={styles.disclaimer}>
        Esta calculadora es solo para fines informativos. Consulte a un asesor financiero para obtener consejos personalizados.
      </p>
    </div>
  );
};

export default CalculadoraInversionesUnificada;
