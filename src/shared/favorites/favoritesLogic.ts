import { type WeatherLocation } from "#shared/weather"

export function isFavorite(
  favorites: WeatherLocation[],
  name: string,
): boolean {
  return favorites.some((favorite) => favorite.name === name)
}

export function addFavoriteToList(
  favorites: WeatherLocation[],
  location: WeatherLocation,
): WeatherLocation[] {
  if (isFavorite(favorites, location.name)) return favorites

  return [...favorites, location]
}

export function removeFavoriteFromList(
  favorites: WeatherLocation[],
  name: string,
): WeatherLocation[] {
  return favorites.filter((favorite) => favorite.name !== name)
}
