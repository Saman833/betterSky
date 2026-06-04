import { type WeatherLocation } from "#shared/weather"

import { CANDIDATE_CITIES } from "./cities"

export function findCityByName(
  name: string,
  favorites: WeatherLocation[] = [],
): WeatherLocation | undefined {
  return (
    favorites.find((favorite) => favorite.name === name) ??
    CANDIDATE_CITIES.find((city) => city.name === name)
  )
}
