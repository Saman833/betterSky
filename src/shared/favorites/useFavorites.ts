import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

import { type WeatherLocation } from "#shared/weather"

const STORAGE_KEY = "favorites"

export function useFavorites(): [WeatherLocation[]] {
  const [favorites, setFavorites] = useState<WeatherLocation[]>([])

  useEffect(() => {
    // void AsyncStorage.setItem(
    //   STORAGE_KEY,
    //   JSON.stringify([
    //     { name: "Reno", latitude: 39.5299, longitude: 119.8143 },
    //     { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
    //   ]),
    // )

    void (async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY)
      if (!cached) return

      const favorites = JSON.parse(cached) as WeatherLocation[]
      setFavorites(favorites)
    })()
  }, [])

  return [favorites]
}
