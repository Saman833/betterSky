import { getSimilarCities, scoreSimilarity } from "./getSimilarCities"

describe("Suggestions > getSimilarCities", () => {
  const barcelona = {
    location: { name: "Barcelona", latitude: 41.38, longitude: 2.17 },
    temperature: 22,
    condition: "Clear" as const,
  }

  const valencia = {
    location: { name: "Valencia", latitude: 39.47, longitude: -0.38 },
    temperature: 23,
    condition: "Clear" as const,
  }

  const london = {
    location: { name: "London", latitude: 51.51, longitude: -0.13 },
    temperature: 10,
    condition: "Cloudy" as const,
  }

  it("scores closer temperature and matching condition lower", () => {
    expect(scoreSimilarity(barcelona, valencia)).toBeLessThan(
      scoreSimilarity(barcelona, london),
    )
  })

  it("returns similar cities excluding favorites", () => {
    const suggestions = getSimilarCities(
      [barcelona],
      [valencia, london],
      ["Barcelona"],
      2,
    )

    expect(suggestions).toHaveLength(2)
    expect(suggestions[0].location.name).toBe("Valencia")
    expect(suggestions[0].similarTo).toBe("Barcelona")
  })

  it("returns empty list when there are no favorites", () => {
    expect(getSimilarCities([], [valencia], [], 5)).toEqual([])
  })
})
