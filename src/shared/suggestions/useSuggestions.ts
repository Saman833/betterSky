import { useEffect, useState } from "react"

import { type WeatherLocation } from "#shared/weather"

import { CANDIDATE_CITIES } from "./cities"
import { type CitySuggestion, getSimilarCities } from "./getSimilarCities"
import { fetchWeatherSnapshots } from "./suggestionsWeather"

export function useSuggestions(favorites: WeatherLocation[]): {
  suggestions: CitySuggestion[]
  loading: boolean
} {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (favorites.length === 0) {
      setSuggestions([])
      return
    }

    void (async () => {
      setLoading(true)

      try {
        const favoriteNames = favorites.map((favorite) => favorite.name)
        const candidateLocations = CANDIDATE_CITIES.filter(
          (city) => !favoriteNames.includes(city.name),
        )
        const favoriteSnapshots = await fetchWeatherSnapshots(favorites)
        const candidateSnapshots =
          await fetchWeatherSnapshots(candidateLocations)

        setSuggestions(
          getSimilarCities(
            favoriteSnapshots,
            candidateSnapshots,
            favoriteNames,
            5,
          ),
        )
      } finally {
        setLoading(false)
      }
    })()
  }, [favorites])

  return { suggestions, loading }
}
