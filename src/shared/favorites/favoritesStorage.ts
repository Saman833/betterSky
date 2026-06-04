import AsyncStorage from "@react-native-async-storage/async-storage"

import { type WeatherLocation } from "#shared/weather"

const STORAGE_KEY = "favorites"

export async function loadFavorites(): Promise<WeatherLocation[]> {
  const cached = await AsyncStorage.getItem(STORAGE_KEY)
  if (!cached) return []

  return JSON.parse(cached) as WeatherLocation[]
}

export async function saveFavorites(
  favorites: WeatherLocation[],
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}
