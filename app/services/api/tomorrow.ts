import {
  formatDate,
  formatDay,
  formatToHyphens,
} from '~/utils/formatDate';
import forecastData from '../moked/forecast.json';
import { fetchWeatherApi } from 'openmeteo';
import { OneDay, TomorrowParams } from '~/utils/types';

export class Tomorrow {
  apiKey = process.env.TOMORROW_KEY;

  async getForecast({ lat, lng }: TomorrowParams) {
    // const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=${this.apiKey}`;

    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();
    const result = forecastData;

    const forecast: OneDay[] = result?.timelines?.daily.map(element => {
      return {
        day: formatDay(element.time),
        date: formatDate(element.time),
        temperatureAvg: Math.round(element.values.temperatureAvg),
        temperatureMax: Math.round(element.values.temperatureMax),
        temperatureMin: Math.round(element.values.temperatureMin),
      };
    });

    const data = {
      currentTemperature: Math.round(
        result.timelines?.minutely[0]?.values.temperature
      ),
      forecast,
    };

    return data;
  }

  async getTrend({
    lat,
    lng,
    endDate = new Date(),
    totalDays = 7,
  }: TomorrowParams) {
    const startDate = new Date(
      endDate.getTime() - totalDays * 24 * 60 * 60 * 1000
    );

    const params = {
      latitude: lat,
      longitude: lng,
      start_date: formatToHyphens(startDate),
      end_date: formatToHyphens(endDate),
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'temperature_2m_mean',
      ],
      timezone: 'Europe/London',
    };
    const url = 'https://archive-api.open-meteo.com/v1/archive';
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;

    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
        temperatureAvg: daily.variables(2)!.valuesArray()!,
      },
    };

    const trendArray = [];

    for (let i = 0; i < weatherData.daily.time.length; i++) {
      if (weatherData.daily.temperature2mMax[i]) {
        trendArray.push({
          day: formatDay(weatherData.daily.time[i].toISOString()),
          date: formatDate(weatherData.daily.time[i].toISOString()),
          temperatureMax: Math.round(weatherData.daily.temperature2mMax[i]),
          temperatureMin: Math.round(weatherData.daily.temperature2mMin[i]),
          temperatureAvg: Math.round(weatherData.daily.temperatureAvg[i]),
        });
      }
    }

    return trendArray;
  }
}
