import forecastData from '../moked/forecast.json'

interface LatLong {
  lat: string,
  long: string
}

export class Tomorrow {
  apiKey = process.env.NODE_ENV;

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
}
