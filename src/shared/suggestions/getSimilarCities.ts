import { type Weather, type WeatherLocation } from "#shared/weather"

export type WeatherSnapshot = {
  location: WeatherLocation
  temperature: number
  condition: Weather
}

export type CitySuggestion = {
  location: WeatherLocation
  temperature: number
  condition: Weather
  similarTo: string
  score: number
}

export function scoreSimilarity(
  favorite: Pick<WeatherSnapshot, "temperature" | "condition">,
  candidate: Pick<WeatherSnapshot, "temperature" | "condition">,
): number {
  const tempDiff = Math.abs(favorite.temperature - candidate.temperature)
  const conditionPenalty = favorite.condition === candidate.condition ? 0 : 15

  return tempDiff + conditionPenalty
}

export function getSimilarCities(
  favorites: WeatherSnapshot[],
  candidates: WeatherSnapshot[],
  favoriteNames: string[],
  limit = 5,
): CitySuggestion[] {
  if (favorites.length === 0) return []

  return candidates
    .filter((candidate) => !favoriteNames.includes(candidate.location.name))
    .map((candidate) => {
      let bestMatch = {
        similarTo: favorites[0].location.name,
        score: Number.POSITIVE_INFINITY,
      }

      for (const favorite of favorites) {
        const score = scoreSimilarity(favorite, candidate)

        if (score < bestMatch.score) {
          bestMatch = {
            similarTo: favorite.location.name,
            score,
          }
        }
      }

      return {
        location: candidate.location,
        temperature: candidate.temperature,
        condition: candidate.condition,
        similarTo: bestMatch.similarTo,
        score: bestMatch.score,
      }
    })
    .sort((left, right) => left.score - right.score)
    .slice(0, limit)
}
