import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../Estilos/EstiloCalculadoras.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CalculadoraRentaInmediata: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: '',
    tasaInteres: '',
    periodo: '',
  });
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [rentaMensual, setRentaMensual] = useState<string>('');
  const [graficoData, setGraficoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularRentaInmediata = () => {
    const { capital, tasaInteres, periodo } = formData;
    if (!capital || !tasaInteres || !periodo) {
      alert('Por favor, completa todos los campos.');
    } else {
      setIsLoading(true);
      setMostrarResultados(true);
    }
  };

  const calcularRentaMensual = (capital: number, tasaInteres: number, periodo: number): number => {
    return (capital * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -periodo));
  };

  useEffect(() => {
    if (mostrarResultados) {
      const capitalFloat = parseFloat(formData.capital);
      const tasaInteresFloat = parseFloat(formData.tasaInteres) / 100 / 12;
      const periodoFloat = parseFloat(formData.periodo);

      if (!isNaN(capitalFloat) && !isNaN(tasaInteresFloat) && !isNaN(periodoFloat)) {
        const renta = calcularRentaMensual(capitalFloat, tasaInteresFloat, periodoFloat);
        setRentaMensual(renta.toFixed(2));

        const labels = Array.from({ length: periodoFloat }, (_, i) => (i + 1).toString());
        const data = {
          labels,
          datasets: [
            {
              label: 'Renta Mensual',
              data: labels.map(() => renta.toFixed(2)),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 2,
            },
          ],
        };
        setGraficoData(data);
      }

      setIsLoading(false);
    }
  }, [mostrarResultados, formData]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculadora de Renta Inmediata</h1>
      <p className={styles.description}>
        Utiliza esta herramienta para calcular los pagos periódicos que recibirías al invertir un capital inicial en una renta inmediata.
      </p>

      {!mostrarResultados ? (
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="capital" className={styles.label}>Capital Inicial</label>
            <input
              id="capital"
              name="capital"
              type="number"
              value={formData.capital}
              onChange={handleInputChange}
              placeholder="Ej: 100000"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tasaInteres" className={styles.label}>Tasa de Interés (%)</label>
            <input
              id="tasaInteres"
              name="tasaInteres"
              type="number"
              value={formData.tasaInteres}
              onChange={handleInputChange}
              placeholder="Ej: 5"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="periodo" className={styles.label}>Período de Pago (meses)</label>
            <input
              id="periodo"
              name="periodo"
              type="number"
              value={formData.periodo}
              onChange={handleInputChange}
              placeholder="Ej: 12"
              className={styles.input}
            />
          </div>

          <button type="button" className={styles.button} onClick={calcularRentaInmediata}>
            Calcular Renta
          </button>
        </form>
      ) : (
        <div className={styles.resultContainer}>
          <h2 className={styles.subtitle}>Resultados</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <p className={styles.resultText}>Capital Inicial: {formData.capital} €</p>
              <p className={styles.resultText}>Tasa de Interés: {formData.tasaInteres} %</p>
              <p className={styles.resultText}>Período: {formData.periodo} meses</p>
              <p className={styles.resultText}>Renta Mensual: {rentaMensual} €</p>
              
              {graficoData && (
                <div className={styles.chartContainer}>
                  <Line data={graficoData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              )}
              
              <button className={styles.button} onClick={() => setMostrarResultados(false)}>
                Volver a Calcular
              </button>
            </>
          )}
        </div>
      )}

      <p className={styles.disclaimer}>
        Nota: Esta calculadora proporciona una estimación. Los resultados reales pueden variar dependiendo de las condiciones específicas del producto de renta inmediata.
      </p>
    </div>
  );
};

export default CalculadoraRentaInmediata;
