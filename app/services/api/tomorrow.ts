import { formatToISOString } from '~/utils/formatDate';
import forecastData from '../moked/forecast.json'

interface LatLong {
  lat: string,
  long: string
}

export class Tomorrow {
  // apiKey = process.env.NODE_ENV;

  async getForecast({ lat = '42.3478', long =  '-71.0466'}: LatLong) {
    // const url = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${apiKey}`;

    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();

    const result = forecastData;
    return result;
  }

  async getCurrentTemperature({ lat = '42.3478', long =  '-71.0466'}: LatLong) {
    // const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=${apiKey}`;

    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();

    const result = forecastData;

    return result.timelines?.minutely[0]?.values.temperature || null;
  }

  async getTrendFromToday({ lat = '42.3478', long =  '-71.0466' }: LatLong) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const url = "https://api.tomorrow.io/v4/timelines";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "apikey": this.apiKey
        },
        body: JSON.stringify({
            location: `${lat},${long}`,
            fields: ["temperature"],
            timesteps: ["1d"],
            startTime: formatToISOString(startDate),
            endTime: formatToISOString(endDate),
            units: "metric"
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching historical weather data:", error);
    }
  }
}
