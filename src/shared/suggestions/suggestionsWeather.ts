import { fetchCurrentWeather, type WeatherLocation } from "#shared/weather"

import { type WeatherSnapshot } from "./getSimilarCities"

export async function fetchWeatherSnapshots(
  locations: WeatherLocation[],
): Promise<WeatherSnapshot[]> {
  return Promise.all(
    locations.map(async (location) => {
      const weather = await fetchCurrentWeather(location)

      return {
        location,
        temperature: weather.temperature,
        condition: weather.condition,
      }
    }),
  )
}
