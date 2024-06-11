import { Chart } from 'chart.js/auto';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { TemperatureDate } from '~/routes/temperature';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function TemperatureChart() {
  const data: TemperatureDate = useLoaderData();

  const forecastLabels = data.forecast.map(element => element.date);
  const forecastTemperatures = data.forecast.map(
    element => element.temperatureAvg
  );

  const chartData = {
    labels: forecastLabels,
    datasets: [
      {
        borderWidth: 2,
        // fill: true,
        label: 'Forecast °C',
        data: forecastTemperatures,
        borderColor: 'rgba(119, 230, 255, 0.2)',
        backgroundColor: 'rgba(0, 193, 255, 0.2)',
        pointBackgroundColor: 'rgba(119, 230, 255, 0.2)',
        pointBorderColor: 'rgba(119, 230, 255, 1)',
        pointHoverBackgroundColor: 'rgba(119, 230, 255, 1)',
        pointHoverBorderColor: 'rgba(119, 230, 255, 0.2)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'white',
        align: 'top',
        formatter: function (value) {
          return value + '°C';
        },
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 30,
        top: 30,
      },
    },
  };

  return (
    <div className='relative w-full lg:w-96 h-52 mb-8'>
      <Line data={chartData} options={options} />
    </div>
  );
}
