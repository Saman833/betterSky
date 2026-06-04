import { useCallback, useEffect, useState } from "react"

import { type WeatherLocation } from "#shared/weather"

import {
  addFavoriteToList,
  isFavorite as isFavoriteInList,
  removeFavoriteFromList,
} from "./favoritesLogic"
import { loadFavorites, saveFavorites } from "./favoritesStorage"

export type UseFavoritesResult = {
  favorites: WeatherLocation[]
  isReady: boolean
  addFavorite: (location: WeatherLocation) => Promise<void>
  removeFavorite: (name: string) => Promise<void>
  isFavorite: (name: string) => boolean
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<WeatherLocation[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    void (async () => {
      setFavorites(await loadFavorites())
      setIsReady(true)
    })()
  }, [])

  const addFavorite = useCallback(async (location: WeatherLocation) => {
    setFavorites((current) => {
      const next = addFavoriteToList(current, location)
      void saveFavorites(next)
      return next
    })
  }, [])

  const removeFavorite = useCallback(async (name: string) => {
    setFavorites((current) => {
      const next = removeFavoriteFromList(current, name)
      void saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (name: string) => isFavoriteInList(favorites, name),
    [favorites],
  )

  return {
    favorites,
    isReady,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
