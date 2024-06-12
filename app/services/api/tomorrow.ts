import { formatDate, formatDay, formatToHyphens } from '~/utils/formatDate';
import { fetchWeatherApi } from 'openmeteo';
import { OneDay, TomorrowParams } from '~/utils/types';

/**
 * Class to interact with the Tomorrow.io and Open-Meteo APIs for weather data.
 */
export class Tomorrow {
  apiKey = process.env.TOMORROW_KEY;

  /**
   * Fetches the weather forecast from Tomorrow.io API.
   * @param {TomorrowParams} param0 - Parameters including latitude and longitude.
   * 
   */
  async getForecast({ lat, lng }: TomorrowParams) {
    try {
      const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lng}&apikey=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const forecast: OneDay[] = result?.timelines?.daily?.map(element => {
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
    } catch (error) {
      try {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const forecast = await this.getTrend({
          lat,
          lng,
          isForecast: true,
          endDate,
        });

        return {
          currentTemperature: forecast[0].temperatureAvg,
          forecast,
        };
      } catch (error) {
        return {
          error: {
            message: 'Tomorrow.io server is down. Please try again later.',
            status: 503,
          },
        };
      }
    }
  }

  /**
   * Fetches the weather trend from Open-Meteo API.
   * @param {TomorrowParams} param0 - Parameters including latitude, longitude, end date, total days, and if it is a forecast request.
   * 
   */
  async getTrend({
    lat,
    lng,
    endDate = new Date(),
    totalDays = 7,
    isForecast = false,
  }: TomorrowParams) {
    const startDate = new Date(
      endDate.getTime() - totalDays * 24 * 60 * 60 * 1000
    );

    try {
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

      const url = isForecast
        ? 'https://api.open-meteo.com/v1/forecast'
        : 'https://archive-api.open-meteo.com/v1/archive';
      const responses = await fetchWeatherApi(url, params);

      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from(
          { length: (stop - start) / step },
          (_, i) => start + i * step
        );

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
          )?.map(t => new Date((t + utcOffsetSeconds) * 1000)),
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
    } catch (error) {
      return {
        error: {
          message: 'Server is down. Please try again later.',
          status: 503,
        },
      };
    }
  }
}
